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
  const [selectedCountry, setSelectedCountry] = useState('+1')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  )

  return (
    <div className='flex gap-10 w-full'>
      <Select defaultValue={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger className='lg:w-full w-5/12 bg-white h-15'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className=''>
          <div className='p-2'>
            <Input
              placeholder='Search countries...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='mb-2'
            />
          </div>
          <div className=''>
            <ScrollArea className='w-full'>
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
          </div>
        </SelectContent>
      </Select>

      <input
        type='tel'
        placeholder='Phone Number'
        className={`w-full p-4 bg-white rounded-lg ${
          error && 'border-2 border-red-500'
        }`}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
  )
}

export default PhoneInputWithCountry
