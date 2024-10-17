'use client'
import { useRouter } from 'next/navigation'
import { interestStore } from '@/app/stores/stores'

const activities = [
  'Hiking',
  'Reading',
  'Cooking',
  'Traveling',
  'Photography',
  'Gaming',
  'Painting',
  'Music',
  'Gardening',
  'Cycling',
  'Dancing',
  'Writing',
  'Swimming',
  'Yoga',
  'Running',
  'Fishing',
  'Camping',
  'Crafting',
  'Fitness',
  'Baking',
]

export default function InterestSelection() {
  const router = useRouter()
  const selectedActivities = interestStore((state: any) => state.interests)
  const setSelectedActivities = interestStore(
    (state: any) => state.setInterests
  )

  const handleContinue = () => {
    router.push('/review')
  }

  return (
    <div className='flex flex-col items-center justify-center p-5 min-h-screen'>
      <h1 className='text-2xl font-semibold text-black mb-5'>Interests</h1>
      <p className='text-lg text-gray-500 text-center mb-5'>
        Select your favorite activities and hobbies from the list below.
      </p>
      <div className='flex flex-wrap justify-center w-3/4'>
        {activities.map((activity) => (
          <button
            key={activity}
            className={`m-2 p-3 text-lg font-medium ${
              selectedActivities.includes(activity)
                ? 'font-semibold border-b-2 border-black'
                : ''
            }`}
            onClick={() => setSelectedActivities(activity)}
          >
            {activity}
          </button>
        ))}
      </div>
      <button
        className={`mt-5 p-4 rounded-lg text-white text-lg ${
          selectedActivities.length === 0
            ? 'bg-red-300 cursor-not-allowed'
            : 'bg-buttonColor'
        }`}
        onClick={handleContinue}
        disabled={selectedActivities.length === 0}
      >
        Continue
      </button>
    </div>
  )
}
