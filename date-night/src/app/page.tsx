'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='mb-5 text-center'>
        <h1 className='text-3xl font-semibold text-black mb-2'>Date Night</h1>
        <p className='text-lg text-gray-500'>
          Inspiring Date Ideas at Your Fingertips
        </p>
      </div>
      <button
        className='bg-buttonColor text-white py-2 px-4 rounded-lg w-20 text-center'
        onClick={() => router.push('/onboarding/DateNightPage')}
      >
        Start
      </button>
    </div>
  )
}
