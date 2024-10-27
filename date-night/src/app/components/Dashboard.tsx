'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDateStore } from '@/app/stores/stores'

interface DateItem {
  id: string
  title: string
}

export default function Dashboard() {
  const router = useRouter()
  const { previousDates, loadDates } = useDateStore()

  const renderItem = (item: DateItem) => (
    <div className='bg-white p-4 my-2 rounded-lg w-full'>
      <button onClick={() => console.log('Item clicked')}>
        <p className='text-lg'>{item.title}</p>
      </button>
    </div>
  )

  useEffect(() => {
    loadDates()
  }, [])

  return (
    <div className='flex flex-col items-center bg-pink-200 p-6 min-h-screen'>
      {/* Profile Button */}
      <div className='absolute top-20 right-10 z-10'>
        <button
          className='bg-red-400 p-3 rounded-full shadow-lg'
          onClick={() => router.push('/profile')}
        >
          <svg
            className='text-white h-7 w-7'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5.121 17.804A8.001 8.001 0 0112 2a8.001 8.001 0 016.879 15.804M12 14v2m0 4h.01'
            />
          </svg>
        </button>
      </div>

      {/* List Container */}
      <div className='flex-grow w-full pt-16'>
        <h1 className='text-2xl font-semibold mb-4 text-black'>
          Previous Dates
        </h1>
        {previousDates.length !== 0 ? (
          <div className='space-y-2'>
            {previousDates.map((item: DateItem) => renderItem(item))}
          </div>
        ) : (
          <p className='text-lg text-gray-600 text-center mt-4'>
            Stay tuned for your first date!
          </p>
        )}
      </div>
    </div>
  )
}
