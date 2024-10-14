// pages/date-night-selection.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
//import { useDayOfWeekStore } from 'src/stores/store';

const daysOfWeek = [
  { short: 'Su', full: 'Sunday' },
  { short: 'Mo', full: 'Monday' },
  { short: 'Tu', full: 'Tuesday' },
  { short: 'We', full: 'Wednesday' },
  { short: 'Th', full: 'Thursday' },
  { short: 'Fr', full: 'Friday' },
  { short: 'Sa', full: 'Saturday' },
]

const DateNightSelectionScreen = () => {
  const router = useRouter()
  //   const selectedDay = useDayOfWeekStore((state) => state.day);
  //   const setSelectedDay = useDayOfWeekStore((state) => state.setDay);
  const [selectedDay, setSelectedDay] = useState('')

  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
  }

  const handleContinue = () => {
    router.push('/TravelAndPrice')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-pink-200 p-5'>
      <h1 className='text-3xl font-medium text-black mb-5'>Date Night</h1>
      <p className='text-lg text-gray-500 text-center mb-5 leading-relaxed'>
        Choose a day of the week that you&apos;d like to have your date night.
        You&apos;ll receive your date the morning of.
      </p>

      <div className='flex justify-center space-x-3'>
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

      <button
        className={`mt-5 py-3 px-6 rounded-lg text-white ${
          selectedDay ? 'bg-red-400' : 'bg-red-200 cursor-not-allowed'
        }`}
        onClick={handleContinue}
        disabled={!selectedDay}
      >
        Continue
      </button>
    </div>
  )
}

export default DateNightSelectionScreen
