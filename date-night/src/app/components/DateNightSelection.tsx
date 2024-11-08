'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { dayOfWeekStore } from '@/app/stores/stores'
import { timesOfDay } from '@/utils/times'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

const daysOfWeek = [
  { short: 'Su', full: 'Sunday' },
  { short: 'Mo', full: 'Monday' },
  { short: 'Tu', full: 'Tuesday' },
  { short: 'We', full: 'Wednesday' },
  { short: 'Th', full: 'Thursday' },
  { short: 'Fr', full: 'Friday' },
  { short: 'Sa', full: 'Saturday' },
]

export default function DateNightSelection() {
  const router = useRouter()
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const setSelectedDay = dayOfWeekStore((state: any) => state.setDay)

  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
  }

  // useEffect(() => {
  //   const day = localStorage.getItem('day')
  //   setSelectedDay(day)
  // })

  const handleContinue = () => {
    router.push('/onboarding/TravelAndPricePage')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5'>
      <h1 className='text-3xl font-medium text-black mb-5'>Day of the Week</h1>
      <p className='text-lg text-gray-500 text-center mb-5 leading-relaxed'>
        Choose a day of the week that you&apos;d like to have your date night.
        You&apos;ll receive your date the morning of.
      </p>

      <div className='flex justify-center justify-between space-x-10'>
        {daysOfWeek.map((day) => (
          <button
            key={day.short}
            className={`p-3 border-b-2 ${
              selectedDay === day.full
                ? 'text-black border-black'
                : 'text-gray-500 border-transparent'
            }`}
            onClick={() => handleDaySelect(day.full)}
          >
            {day.short}
          </button>
        ))}
      </div>
      <div>
        <p className='text-3xl font-medium text-black mb-5 mt-10'>
          Time of Day
        </p>
        <Select
        // defaultValue={selectedCountry}
        // onValueChange={handleCountryChange}
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
      </div>

      <button
        className={`mt-5 py-3 px-6 rounded-lg text-white bg-buttonColor ${
          selectedDay ? ' bg-buttonColor' : 'bg-red-300 cursor-not-allowed'
        }`}
        onClick={handleContinue}
        disabled={!selectedDay}
      >
        Continue
      </button>
    </div>
  )
}
