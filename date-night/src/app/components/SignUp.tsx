'use client'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/app/components/Modal'
import { z } from 'zod'
import debounce from 'lodash/debounce'
//import OTPModal from '../components/OTPModal'
import { supabase } from '@/utils/supabase/client'
import {
  dayOfWeekStore,
  interestStore,
  priceStore,
  timeOfDayStore,
  travelStore,
  userIDStore,
} from '@/app/stores/stores'
import PhoneInput from '@/app/components/PhoneInput'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpValue, setOtpValue] = useState('') // State for OTP
  const [phoneError, setPhoneError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const selectedPrice = priceStore((state: any) => state.price)
  const selectedTravel = travelStore((state: any) => state.travel)
  const interests = interestStore((state: any) => state.interests)
  const geoDBKEY = process.env.NEXT_PUBLIC_GEODB_KEY!
  const selectedTime = timeOfDayStore((state: any) => state.time)
  const router = useRouter()

  const signUpSchema = z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      location: z.string().min(2),
      phoneNumber: z.string().min(12).max(12),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'passwords do not match',
      path: ['confirmPassword'],
    })

  function resetErrors() {
    setPhoneError(false)
    setFirstNameError(false)
    setLastNameError(false)
    setConfirmPasswordError(false)
    setPasswordError(false)
    setLocationError(false)
  }

  useEffect(() => {
    if (firstName.length >= 2) {
      setFirstNameError(false)
    }
  }, [firstName])

  useEffect(() => {
    if (lastName.length >= 2) {
      setLastNameError(false)
    }
  }, [lastName])

  useEffect(() => {
    if (query.length >= 2) {
      setLocationError(false)
    }
  }, [query])

  useEffect(() => {
    if (password.length >= 6) {
      setPasswordError(false)
    }
  }, [password])

  useEffect(() => {
    if (confirmPassword === password && confirmPassword.length >= 6) {
      setConfirmPasswordError(false)
    }
  }, [confirmPassword, password])

  useEffect(() => {
    if (phoneNumber.length >= 10) {
      setPhoneError(false)
    }
  }, [phoneNumber])

  const handleSignUp = async () => {
    try {
      resetErrors()
      const formData = {
        firstName,
        lastName,
        location: query,
        phoneNumber,
        password,
        confirmPassword,
      }
      signUpSchema.parse(formData)

      const { data, error: signUpError } = await supabase.auth.signUp({
        phone: phoneNumber,
        password: password,
      })

      setIsModalVisible(true)
    } catch (error: any) {
      if (error.errors) {
        const zodErrors = error.errors.map((err: any) => err.path[0])

        if (zodErrors.includes('firstName')) {
          setFirstNameError(true)
        }
        if (zodErrors.includes('lastName')) {
          setLastNameError(true)
        }
        if (zodErrors.includes('location')) {
          setLocationError(true)
        }
        if (zodErrors.includes('phoneNumber')) {
          setPhoneError(true)
        }
        if (zodErrors.includes('password')) {
          setPasswordError(true)
        }
        if (zodErrors.includes('confirmPassword')) {
          setConfirmPasswordError(true)
        }
      }
    }
  }

  const fetchCities = async (query: string) => {
    if (!query) {
      setCitySuggestions([])
      return
    }
    setLoading(true)
    try {
      const response = await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': geoDBKEY,
          },
        }
      )
      const data = await response.json()
      if (data && data.data) {
        const cities = data.data.map(
          (city: any) => `${city.city}, ${city.regionCode}`
        )
        setCitySuggestions(cities)
      } else {
        setCitySuggestions([])
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const debouncedFetchCities = useCallback(
    debounce((query: string) => {
      fetchCities(query)
    }, 1000),
    []
  )
  function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`
    }

    return phoneNumber
  }

  useEffect(() => {
    debouncedFetchCities(query)
  }, [query])

  async function goNext() {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otpValue,
        type: 'sms',
      })
      if (error) {
        throw error.message
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (data) {
          const { error: insertError } = await supabase
            .from('user_onboarding')
            .upsert({
              id: data?.user?.id,
              first_name: firstName,
              last_name: lastName,
              phone_number: formatPhoneNumber(phoneNumber),
              location: '',
              budget: selectedPrice,
              travel: selectedTravel,
              day: selectedDay,
              time: selectedTime,
              interests: interests,
            })
        }
        setIsModalVisible(false)
        router.push('/dashboard/DashboardPage')
      }
    } catch (error: any) {
      console.log('error ', error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background w-screen'>
      <Modal
        isOpen={isModalVisible}
        onBack={() => setIsModalVisible(false)}
        onContinue={goNext}
        phoneNumber={phoneNumber}
        otpValue={otpValue}
        setOtpValue={setOtpValue}
      />
      <h1 className='text-2xl font-medium text-black mb-4'>
        Create Your Account
      </h1>
      <div className='sm:w-5/12 w-9/12 space-y-4'>
        <div className='flex w-full gap-10'>
          <input
            type='text'
            placeholder='First Name'
            className={`w-full p-4 bg-white rounded-lg ${
              firstNameError && 'border-2 border-red-500'
            }`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Last Name'
            className={`w-full p-4 bg-white rounded-lg ${
              lastNameError && 'border-2 border-red-500'
            }`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {(firstNameError || lastNameError) && (
          <div className='flex flex-row text-red-500 text-xs mt-2 justify-between'>
            {firstNameError && (
              <p className='fixed block'>
                *First name needs to be longer than 2 characters
              </p>
            )}
            {lastNameError && (
              <p className='fixed block'>
                *Last name needs to be longer than 2 characters
              </p>
            )}
          </div>
        )}
        <PhoneInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          error={phoneError}
        />
        {phoneError && (
          <p className='text-right text-red-500 text-xs'>
            *Phone Number should be 10 digits
          </p>
        )}
        <input
          type='text'
          placeholder='City (e.g. New York, NY)'
          className={`w-full p-4 bg-white rounded-lg ${
            locationError && 'border-2 border-red-500'
          }`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* {citySuggestions.length > 0 && (
          <div className='bg-white rounded-lg mt-1'>
            {citySuggestions.map((suggestion) => (
              <div
                key={suggestion}
                className='p-2 cursor-pointer hover:bg-gray-200'
                onClick={() => {
                  setLocation(suggestion)
                  setCitySuggestions([])
                  setQuery(suggestion)
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )} */}
        {locationError && (
          <p className='text-red-500 text-xs'>*Please enter a location</p>
        )}
        <input
          type='password'
          placeholder='Password'
          className={`w-full p-4 bg-white rounded-lg ${
            passwordError && 'border-2 border-red-500'
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && (
          <p className='text-red-500 text-xs'>
            *Password needs to be longer than 6 characters
          </p>
        )}

        <input
          type='password'
          placeholder='Confirm Password'
          className={`w-full p-4 bg-white rounded-lg ${
            confirmPasswordError && 'border-2 border-red-500'
          }`}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPasswordError && (
          <p className='text-red-500 text-xs'>*Passwords do not match</p>
        )}

        <button
          className='w-full p-4 bg-buttonColor text-white rounded-lg mt-4'
          onClick={handleSignUp}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}
