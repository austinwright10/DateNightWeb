'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { interestStore, userIDStore } from '@/app/stores/stores'
import { CheckOutlined } from '@ant-design/icons'

interface UserInfo {
  phone_number: string
  location: string
  budget: string
  travel: string
  day: string
  onboard: {
    selectedPrice: string
    selectedTravel: string
    selectedDay: string
    interests: string[]
  }
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    phone_number: '',
    location: '',
    budget: '',
    travel: '',
    day: '',
    onboard: {
      selectedPrice: '',
      selectedTravel: '',
      selectedDay: '',
      interests: [],
    },
  })

  const [editingPhone, setEditingPhone] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [editingBudget, setEditingBudget] = useState(false)
  const [editingTravel, setEditingTravel] = useState(false)
  const [editingDay, setEditingDay] = useState(false)

  const [tempPhone, setTempPhone] = useState('')
  const [tempLocation, setTempLocation] = useState('')
  const [tempBudget, setTempBudget] = useState('')
  const [tempTravel, setTempTravel] = useState('')
  const [tempDay, setTempDay] = useState('')

  const userID = userIDStore((state: any) => state.id)
  const interests = interestStore((state: any) => state.interests)
  const setInterests = interestStore((state: any) => state.setInterests)

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError) {
      console.log('Error fetching user:', userError)
      return
    }

    if (userData && userData.user) {
      const { id } = userData.user

      const { data, error: fetchError } = await supabase
        .from('user_onboarding')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        console.log('Error fetching data for profile:', fetchError)
      } else {
        console.log('data ', data)
        if (data) {
          setUserInfo({
            phone_number: data.phone_number || '',
            location: data.location || '',
            budget: data.onboard.selectedPrice || '',
            travel: data.onboard.selectedTravel || '',
            day: data.onboard.selectedDay || '',
            onboard: {
              selectedPrice: data.onboard.selectedPrice || '',
              selectedTravel: data.onboard.selectedTravel || '',
              selectedDay: data.onboard.selectedDay || '',
              interests: data.onboard.interests || [],
            },
          })

          setTempPhone(data.phone_number || '')
          setTempLocation(data.location || '')
          setTempBudget(data.onboard.selectedPrice || '')
          setTempTravel(data.onboard.selectedTravel || '')
          setTempDay(data.onboard.selectedDay || '')
        }
      }
    } else {
      console.log('No user data found')
    }
  }

  const handleSave = async () => {
    const updates: any = {}

    if (tempPhone !== userInfo.phone_number) {
      updates.phone_number = tempPhone
    }
    if (tempLocation !== userInfo.location) {
      updates.location = tempLocation
    }
    if (tempBudget !== userInfo.budget) {
      updates.onboard = { ...userInfo.onboard, selectedPrice: tempBudget }
    }
    if (tempTravel !== userInfo.travel) {
      updates.onboard = { ...userInfo.onboard, selectedTravel: tempTravel }
    }
    if (tempDay !== userInfo.day) {
      updates.onboard = { ...userInfo.onboard, selectedDay: tempDay }
    }

    const { error } = await supabase
      .from('registered_users')
      .update(updates)
      .eq('id', userID[0].id)

    if (error) {
      console.error('Error updating user info:', error)
    } else {
      setUserInfo((prev) => ({
        ...prev,
        phone_number: tempPhone,
        location: tempLocation,
        day: tempDay,
        budget: tempBudget,
        travel: tempTravel,
        onboard: {
          ...prev.onboard,
          selectedPrice: tempBudget,
          selectedTravel: tempTravel,
          selectedDay: tempDay,
        },
      }))
      setEditingPhone(false)
      setEditingLocation(false)
      setEditingBudget(false)
      setEditingTravel(false)
      setEditingDay(false)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.error('Sign-out error:', error)
  }

  return (
    <div className='container mx-auto px-4 py-10'>
      <h1 className='text-3xl font-bold mb-6'>Profile</h1>

      <div className='mb-6'>
        <label className='block text-lg font-medium mb-1'>Location</label>
        {!editingLocation ? (
          <div className='flex justify-between items-center'>
            <span>{userInfo.location}</span>
            {/* <Ionicons
              name='pencil'
              size={24}
              onClick={() => {
                setTempLocation(userInfo.location)
                setEditingLocation(true)
              }}
              className='cursor-pointer'
            /> */}
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            <input
              className='input'
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
            />
            <CheckOutlined onClick={handleSave} className='cursor-pointer' />
          </div>
        )}
      </div>

      {/* Similar blocks for Phone Number, Budget, Travel, and Day */}
      {/* Interests Section */}
      <div className='mb-6'>
        <h2 className='text-lg font-medium mb-2'>Interests</h2>
        <div className='flex flex-wrap'>
          {interests.map((interest: string) => (
            <button
              key={interest}
              className={`m-2 px-4 py-2 rounded ${
                interests.includes(interest)
                  ? 'bg-red-500 text-white'
                  : 'bg-white border'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      <button
        className='bg-red-400 text-white px-6 py-2 rounded'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  )
}

export default Profile
