'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { priceStore, travelStore } from '@/app/stores/stores'
import { Slider } from '@/components/ui/slider'

export default function TravelAndPrice() {
  const router = useRouter()

  const selectedPrice = priceStore((state: any) => state.price)
  const setSelectedPrice = priceStore((state: any) => state.setPrice)
  const selectedTravel = travelStore((state: any) => state.travel)
  const setSelectedTravel = travelStore((state: any) => state.setTravel)
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-red-100 p-5'>
      <h1 className='text-3xl font-medium text-black mb-5'>Price and Travel</h1>
      <div className='w-3/5 flex flex-col items-center'>
        <div className='mb-10 w-1/3'>
          <h2 className='text-xl text-gray-600 text-center mb-2'>
            What is your budget per date?
          </h2>
          <p className='text-center text-lg mb-5'>${selectedPrice}</p>
          <Slider
            min={1}
            max={100}
            step={1}
            onValueChange={(value) => setSelectedPrice(value)}
            //defaultValue={selectedPrice}
          />
        </div>
        <div className='w-1/3'>
          <h2 className='text-xl text-gray-600 text-center mb-2'>
            How far are you willing to travel?
          </h2>
          <p className='text-center text-lg mb-5'>{selectedTravel} mi.</p>
          <Slider
            min={0}
            max={50}
            step={1}
            onValueChange={(value) => setSelectedTravel(value)}
            // defaultValue={selectedTravel}
          />
        </div>
      </div>
      <button
        className='mt-5 bg-red-400 text-white py-3 px-6 rounded-md'
        onClick={() => router.push('/interest-selection')}
      >
        Continue
      </button>
    </div>
  )
}
