'use client'
import { useCallback, useEffect, useState } from 'react'
import { z } from 'zod'
import debounce from 'lodash/debounce'
//import OTPModal from '../components/OTPModal'
//import { supabase } from '@/utils/supabase/client'
import {
  dayOfWeekStore,
  interestStore,
  priceStore,
  travelStore,
  userIDStore,
} from '@/app/stores/stores'

export default function SignUp({ router }: any) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneError, setPhoneError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [location, setLocation] = useState('')
  const [locationError, setLocationError] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const selectedPrice = priceStore((state: any) => state.price)
  const selectedTravel = travelStore((state: any) => state.travel)
  const interests = interestStore((state: any) => state.interests)
  const geoDBKEY = process.env.NEXT_PUBLIC_GEODB_KEY!
  const setID = userIDStore((state: any) => state.setID)

  const signUpSchema = z
    .object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      location: z.string().min(2),
      phoneNumber: z.string().min(10),
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

  const locationRegex = /^([A-Za-z\s]+),\s*([A-Z]{2})$/
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

  const handleSignUp = async () => {
    try {
      const formData = {
        firstName,
        lastName,
        location,
        phoneNumber,
        password,
        confirmPassword,
      }
      signUpSchema.parse(formData)
      resetErrors()
      setIsModalVisible(true)
    } catch (error: any) {
      const zodErrors = error.errors.map((err: any) => err.path[0])
      resetErrors()

      if (zodErrors.includes('firstName')) {
        setFirstNameError(true)
      }
      if (zodErrors.includes('lastName')) {
        setLastNameError(true)
      }
      if (!locationRegex.test(location)) {
        setLocationError(true)
      }
      if (zodErrors.includes('phoneNumber') || !phoneRegex.test(phoneNumber)) {
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

  const handleModalVisibility = (isVisible: boolean) => {
    setIsModalVisible(isVisible)
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

  useEffect(() => {
    debouncedFetchCities(query)
  }, [query])

  function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`
    }

    return phoneNumber
  }

  async function goNext() {
    try {
      const onboardData = {
        selectedDay,
        selectedPrice,
        selectedTravel,
        interests,
      }
      const onboardJSON = JSON.stringify(onboardData)

      const { data, error: insertError } = await supabase
        .from('registered_users')
        .insert({
          first_name: firstName,
          last_name: lastName,
          phone_number: formatPhoneNumber(phoneNumber),
          location: location,
          onboard: onboardJSON,
        })
        .select('id')

      if (insertError) {
        throw insertError
      }
      if (data) {
        setID(data)
      }
      setIsModalVisible(false)
      router.push('/paywall')
    } catch (error: any) {
      console.log('error ', error)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background w-screen'>
      {/* <OTPModal
        handleModalVisibility={handleModalVisibility}
        isVisible={isModalVisible}
        phoneNumber={phoneNumber}
        next={goNext}
      /> */}
      <h1 className='text-2xl font-medium text-black mb-4'>
        Create Your Account
      </h1>
      <div className='w-5/12 space-y-4'>
        <div className='flex w-full gap-10'>
          <input
            type='text'
            placeholder='First Name'
            className={`w-full p-4 bg-white rounded-lg ${
              firstNameError && 'border-2 border-red-500'
            }`}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isClicked}
          />
          <input
            type='text'
            placeholder='Last Name'
            className={`w-full p-4 bg-white rounded-lg ${
              lastNameError && 'border-2 border-red-500'
            }`}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isClicked}
          />
        </div>
        <div className='flex w-full gap-10 h-1'>
          {firstNameError && (
            <p className='text-red-500 text-xs'>
              *First name needs to be longer than 2 characters
            </p>
          )}
          {lastNameError && (
            <p className='text-red-500 text-xs'>
              *Last name needs to be longer than 2 characters
            </p>
          )}
        </div>
        <input
          type='text'
          placeholder='Phone Number'
          className={`w-full p-4 bg-white rounded-lg ${
            phoneError && 'border-2 border-red-500'
          }`}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isClicked}
        />
        {phoneError && (
          <p className='text-red-500 text-sm'>
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
        {citySuggestions.length > 0 && (
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
        )}

        <input
          type='password'
          placeholder='Password'
          className={`w-full p-4 bg-white rounded-lg ${
            passwordError && 'border-2 border-red-500'
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isClicked}
        />
        {passwordError && (
          <p className='text-red-500 text-sm'>
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
          disabled={isClicked}
        />
        {confirmPasswordError && (
          <p className='text-red-500 text-sm'>*Passwords do not match</p>
        )}

        <button
          className='w-full p-4 bg-buttonColor text-white rounded-lg mt-4'
          onClick={handleSignUp}
          disabled={isClicked}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}