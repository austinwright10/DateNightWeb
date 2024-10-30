'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDateStore } from '@/app/stores/stores'
import { UserOutlined, RightOutlined } from '@ant-design/icons'

interface DateItem {
  id: string
  title: string
}

export default function Dashboard() {
  const router = useRouter()
  const { previousDates, loadDates } = useDateStore()

  const renderItem = (item: DateItem) => (
    <div className='bg-white p-4 my-2 rounded-lg w-full'>
      <button
        onClick={() => console.log('Item clicked')}
        className='w-full text-left flex flex-row justify-between items-center'
      >
        <p className='text-xl'>{item.title}</p>
        <RightOutlined />
      </button>
    </div>
  )

  useEffect(() => {
    loadDates()
  }, [])

  return (
    <div className='flex flex-col items-center p-10 sm:p-20 min-h-screen'>
      <div className='flex flex-row w-full justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold text-black'>Previous Dates</h1>
        <button
          className='bg-buttonColor p-3 rounded-full shadow-lg'
          onClick={() => router.push('/profile')}
        >
          <UserOutlined style={{ fontSize: '22px' }} />
        </button>
      </div>

      {/* Main Content */}
      <div className='flex flex-col w-full'>
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
