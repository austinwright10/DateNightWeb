'use client'

import React, { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { countryCodes } from '@/utils/countries'

interface PhoneInputProps {
  phoneNumber: string
  setPhoneNumber: (value: string) => void
  error?: boolean
}

const PhoneInputWithCountry = ({
  phoneNumber,
  setPhoneNumber,
  error,
}: PhoneInputProps) => {
  const [selectedCountry, setSelectedCountry] = useState('+1')
  const [searchQuery, setSearchQuery] = useState('')
  const [localPhoneNumber, setLocalPhoneNumber] = useState('')

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  )

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setLocalPhoneNumber(value)
  }

  const handleCountryChange = (code: string) => {
    setSelectedCountry(code)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localPhoneNumber) {
        const fullNumber = `${selectedCountry}${localPhoneNumber}`
        setPhoneNumber(fullNumber)
      } else {
        setPhoneNumber('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [localPhoneNumber, selectedCountry, setPhoneNumber])

  useEffect(() => {
    if (phoneNumber) {
      const withoutCountry = phoneNumber.replace(/^\+\d+/, '')
      setLocalPhoneNumber(withoutCountry)
    }
  }, [])

  return (
    <div className='flex gap-10 w-full'>
      <Select
        defaultValue={selectedCountry}
        onValueChange={handleCountryChange}
      >
        <SelectTrigger className='lg:w-full w-5/12 bg-white h-15'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <div className='p-2'>
            <Input
              placeholder='Search countries...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mb-2'
            />
          </div>
          <ScrollArea className='h-72'>
            {filteredCountries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className='flex items-center gap-2'>
                  <span>{country.flag}</span>
                  <span className='font-medium'>{country.code}</span>
                  <span className='text-sm'>{country.country}</span>
                </div>
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>

      <div className='relative w-full'>
        <input
          type='tel'
          placeholder='Phone Number'
          className={`w-full p-4 bg-white rounded-lg ${
            error && 'border-2 border-red-500'
          }`}
          value={localPhoneNumber}
          onChange={handlePhoneChange}
          maxLength={15}
        />
        {localPhoneNumber && (
          <div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500'>
            {selectedCountry + localPhoneNumber}
          </div>
        )}
      </div>
    </div>
  )
}

export default PhoneInputWithCountry
