'use client'
import { useEffect } from 'react'
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
  }, [setSelectedTime])

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

      <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-screen-sm'>
        {daysOfWeek.map((day, index) => (
          <div
            key={day.short}
            className={`p-4 border rounded-lg text-center cursor-pointer transition-transform transform ${
              selectedDay === day.full
                ? 'bg-buttonColor text-white scale-105'
                : 'bg-white text-black'
            } ${index === 6 ? 'col-span-2 sm:col-span-1 sm:col-start-2' : ''}`}
            onClick={() => handleDaySelect(day.full)}
          >
            <h3 className='text-lg font-semibold'>{day.short}</h3>
            <p className='text-sm'>{day.full}</p>
          </div>
        ))}
      </div>

      <div className='w-full sm:w-1/3 mt-10'>
        <p className='text-3xl font-medium text-black mb-5 text-center'>
          Time of Day
        </p>
        <Select value={selectedTime} onValueChange={handleTimeChange}>
          <SelectTrigger className='w-full bg-white border border-gray-300 rounded-lg shadow-sm hover:border-buttonColor focus:border-buttonColor focus:ring focus:ring-buttonColor focus:ring-opacity-50'>
            <SelectValue placeholder='Select Time' />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className='h-72'>
              {timesOfDay.map((time) => (
                <SelectItem
                  key={time}
                  value={time}
                  className='flex items-center justify-center hover:bg-buttonColor hover:text-white transition-colors'
                >
                  <div className='flex items-center justify-center w-full'>
                    <span className='text-lg'>{time}</span>
                  </div>
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>

      <button
        className={`mt-10 py-3 px-6 rounded-lg text-white bg-buttonColor ${
          selectedDay && selectedTime
            ? 'bg-buttonColor'
            : 'bg-red-300 cursor-not-allowed'
        }`}
        onClick={handleContinue}
        disabled={!selectedDay || !selectedTime}
      >
        Continue
      </button>
    </div>
  )
}
