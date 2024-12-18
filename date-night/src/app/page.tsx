'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Lottie from 'lottie-react'
import Heart from '@/app/public/heart.json'

export default function Home() {
  const router = useRouter()
  return (
    <div className='bg-gradient-to-t from-background to-pink-100'>
      <div className='flex flex-col items-center min-h-screen'>
        <div className='w-full py-20'>
          <div className='container mx-auto px-4 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-black mb-4'>
              Date Night
            </h1>
            <p className='text-xl text-gray-600 mb-8'>
              Inspiring Date Ideas at Your Fingertips
            </p>
            <button
              className='bg-buttonColor text-white py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition-all'
              onClick={() => router.push('/onboarding/DateNightPage')}
            >
              Get Started
            </button>
          </div>
        </div>

        <section className='py-16 w-full'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              Why Choose Date Night?
            </h2>
            <div className='grid md:grid-cols-3 gap-8'>
              <FeatureCard
                title='Personalized Ideas'
                description='Get custom date suggestions based on your interests, budget, and location'
                icon='/icons/personalize.svg'
                type='image'
              />
              <FeatureCard
                title='Never Run Out of Ideas'
                description='Access hundreds of unique date ideas, from romantic dinners to adventure activities'
                icon='/icons/ideas.svg'
                type='image'
              />
              <FeatureCard
                title='Save Favorites'
                description='Keep track of your favorite date ideas and create your dating bucket list'
                icon={Heart}
                type='lottie'
              />
            </div>
          </div>
        </section>

        <section className='py-16 w-full'>
          <div className='container mx-auto px-4'>
            <h2 className='text-3xl font-bold text-center mb-12'>
              How It Works
            </h2>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div className='relative h-[400px]'>
                <Image
                  src='/images/app-preview.jpg'
                  alt='Date Night App Preview'
                  fill
                  className='object-contain rounded-lg shadow-lg'
                />
              </div>
              <div className='space-y-6'>
                <Step number={1} title='Tell us about yourself' />
                <Step number={2} title='Get personalized date suggestions' />
                <Step number={3} title='Have your perfect date planned' />
                <Step number={4} title='Create lasting memories' />
              </div>
            </div>
          </div>
        </section>

        <section className='py-20 w-full'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-bold mb-6'>
              Ready to Spark Your Romance?
            </h2>
            <p className='text-xl text-gray-600 mb-8'>
              Join thousands of couples who have transformed their date nights
            </p>
            <button
              className='bg-buttonColor text-white py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition-all'
              onClick={() => router.push('/onboarding/DateNightPage')}
            >
              Start Your Journey
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

const FeatureCard = ({
  title,
  description,
  icon,
  type = 'image',
}: {
  title: string
  description: string
  icon: string | any
  type?: 'image' | 'lottie'
}) => (
  <div className='text-center p-6 rounded-lg bg-gray-50'>
    <div
      className={`mx-auto mb-4 ${
        type === 'lottie'
          ? 'h-32 flex items-center justify-center'
          : 'w-16 h-16'
      }`}
    >
      {type === 'image' ? (
        <Image src={icon} alt={title} width={64} height={64} />
      ) : (
        <Lottie
          animationData={icon}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      )}
    </div>
    <h3 className='text-xl font-semibold mb-2'>{title}</h3>
    <p className='text-gray-600'>{description}</p>
  </div>
)

const Step = ({ number, title }: { number: number; title: string }) => (
  <div className='flex items-center space-x-4'>
    <div className='w-8 h-8 bg-buttonColor text-white rounded-full flex items-center justify-center'>
      {number}
    </div>
    <p className='text-lg'>{title}</p>
  </div>
)
