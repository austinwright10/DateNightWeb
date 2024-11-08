'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { dayOfWeekStore, timeOfDayStore } from '@/app/stores/stores'
import { timesOfDay } from '@/utils/times'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  const selectedTime = timeOfDayStore((state: any) => state.time)
  const setSelectedTime = timeOfDayStore((state: any) => state.setTime)

  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
  }
  const handleTimeChange = (code: string) => {
    setSelectedTime(code)
  }
  useEffect(() => {
    const time = localStorage.getItem('time')
    if (time) {
      const parsedTime = JSON.parse(time)
      setSelectedTime(parsedTime.state.time)
    }
  })
  const handleContinue = () => {
    router.push('/onboarding/TravelAndPricePage')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5'>
      <h1 className='text-3xl font-medium text-black mb-5 text-center'>
        Day of the Week
      </h1>
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
      <div className='w-1/2 sm:w-1/3'>
        <p className='text-3xl font-medium text-black mb-5 mt-10 text-center'>
          Time of Day
        </p>
        <Select defaultValue={selectedTime}>
          <SelectTrigger className='w-full bg-white h-10'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <div className='p-2'></div>
            <ScrollArea className='h-72'>
              {timesOfDay.map((time) => (
                <SelectItem
                  key={time}
                  value={time}
                  className='flex items-center justify-center'
                >
                  <div
                    className='flex items-center justify-center w-full'
                    onClick={() => handleTimeChange(time)}
                  >
                    <span className='text-lg'>{time}</span>
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
