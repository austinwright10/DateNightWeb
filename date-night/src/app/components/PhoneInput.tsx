'use client'

import React, { useState } from 'react'
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
  const [selectedCountry, setSelectedCountry] = React.useState('+1')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  )

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setPhoneNumber(value)
  }

  return (
    <div className='flex gap-10 w-full'>
      <Select defaultValue={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger className='w-1/2 bg-white h-15'>
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
          <ScrollArea className=''>
            {filteredCountries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className='flex items-center gap-2'>
                  <span>{country.flag}</span>
                  <span className='font-medium'>{country.code}</span>
                  <span className='text-gray-500 text-sm'>
                    {country.country}
                  </span>
                </div>
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>

      <input
        type='tel'
        placeholder='Phone Number'
        className={`w-1/2 p-4 bg-white rounded-lg ${
          error && 'border-2 border-red-500'
        }`}
        value={phoneNumber}
        onChange={handlePhoneChange}
      />
    </div>
  )
}

export default PhoneInputWithCountry
