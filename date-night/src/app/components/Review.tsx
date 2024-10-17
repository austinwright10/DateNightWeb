'use client'
import { useRouter } from 'next/navigation'
import { dayOfWeekStore, priceStore, travelStore } from '@/app/stores/stores'

export default function ReviewScreen() {
  const router = useRouter()
  const selectedDay = dayOfWeekStore((state: any) => state.day)
  const selectedTravel = travelStore((state: any) => state.travel)
  const selectedPrice = priceStore((state: any) => state.price)

  const handleSignUp = () => {
    router.push('/signup')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5'>
      <h1 className='text-3xl font-medium text-black mb-5'>
        Review Your Selections
      </h1>

      <div className='bg-white p-6 rounded-lg shadow-md w-3/4 mb-5'>
        <div className='flex justify-between mb-3'>
          <span className='font-semibold text-lg text-gray-800'>
            Date Night:
          </span>
          <span className='text-lg text-gray-600'>{selectedDay}</span>
        </div>
        <div className='flex justify-between mb-3'>
          <span className='font-semibold text-lg text-gray-800'>Budget:</span>
          <span className='text-lg text-gray-600'>${selectedPrice}.00</span>
        </div>
        <div className='flex justify-between mb-3'>
          <span className='font-semibold text-lg text-gray-800'>Distance:</span>
          <span className='text-lg text-gray-600'>{selectedTravel} mi.</span>
        </div>
      </div>

      <p className='text-center text-gray-500 text-base mb-5 w-3/4'>
        To receive personalized date ideas and reminders, please create an
        account.
      </p>

      <button
        onClick={handleSignUp}
        className='bg-buttonColor text-white font-bold py-3 px-6 rounded-lg w-3/4'
      >
        Create Account
      </button>
    </div>
  )
}
