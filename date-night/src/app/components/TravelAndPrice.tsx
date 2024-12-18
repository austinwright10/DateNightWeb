'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { priceStore, travelStore } from '@/app/stores/stores'
import { Slider } from '@/components/ui/slider'

export default function TravelAndPrice() {
  const router = useRouter()

  useEffect(() => {})

  const selectedPrice = priceStore((state: any) => state.price)
  const setSelectedPrice = priceStore((state: any) => state.setPrice)
  const selectedTravel = travelStore((state: any) => state.travel)
  const setSelectedTravel = travelStore((state: any) => state.setTravel)
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5'>
      <h1 className='text-3xl font-medium text-black mb-5'>Price and Travel</h1>
      <div className='w-3/5 flex flex-col items-center'>
        <div className='mb-10 w-full md:w-1/2'>
          <h2 className='text-xl text-gray-600 text-center mb-2'>
            What is your budget per date?
          </h2>
          <p className='text-center text-lg mb-5'>${selectedPrice}</p>
          <Slider
            min={1}
            max={100}
            step={1}
            value={[selectedPrice]}
            onValueChange={(value) => setSelectedPrice(value)}
          />
        </div>
        <div className=' w-full md:w-1/2'>
          <h2 className='text-xl text-gray-600 text-center mb-2'>
            How far are you willing to travel?
          </h2>
          <p className='text-center text-lg mb-5'>{selectedTravel} mi.</p>
          <Slider
            min={0}
            max={50}
            step={1}
            value={[selectedTravel]}
            onValueChange={(value) => setSelectedTravel(value)}
          />
        </div>
      </div>
      <button
        className={`mt-10 ${
          selectedPrice === 0 && selectedTravel === 0
            ? 'bg-red-300 disabled'
            : 'bg-buttonColor'
        } text-white py-3 px-6 rounded-md`}
        onClick={() => router.push('/onboarding/InterestSelectionPage')}
      >
        Continue
      </button>
    </div>
  )
}
