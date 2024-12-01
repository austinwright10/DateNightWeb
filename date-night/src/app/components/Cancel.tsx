'use client'
import { useRouter } from 'next/navigation'

export default function Cancel() {
  const router = useRouter()

  const handleResubscribe = () => {
    // Redirect to subscription page or trigger subscription flow
    router.push('/subscribe')
  }

  return (
    <div className='flex flex-col items-center justify-center p-5 min-h-screen text-center'>
      <h1 className='text-2xl font-semibold text-black mb-5'>
        Subscription Cancelled
      </h1>
      <p className='text-lg text-gray-500 text-center mb-5'>
        To enjoy our services, please subscribe below.
      </p>

      <button
        className='mt-5 p-4 rounded-lg text-white text-lg bg-buttonColor'
        onClick={handleResubscribe}
      >
        Subscribe
      </button>
    </div>
  )
}
