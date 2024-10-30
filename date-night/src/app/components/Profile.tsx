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
    try {
      const { data, error } = await supabase
        .from('registered_users')
        .select('id, phone_number, location, onboard')
        .eq('id', userID[0].id)
        .single()

      if (error) {
        console.log('error from profile ', error)
      } else {
        const onboardData = data.onboard || {}
        setUserInfo({
          phone_number: data.phone_number || '',
          location: data.location || '',
          budget: onboardData.selectedPrice || '',
          travel: onboardData.selectedTravel || '',
          day: onboardData.selectedDay || '',
          onboard: onboardData,
        })
        setTempPhone(data.phone_number || '')
        setTempLocation(data.location || '')
        setTempBudget(onboardData.selectedPrice || '')
        setTempTravel(onboardData.selectedTravel || '')
        setTempDay(onboardData.selectedDay || '')
      }
    } catch (error) {
      console.log('error ', error)
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

  const toggleInterest = (interest: string) => {
    setInterests(interest)
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
              onClick={() => toggleInterest(interest)}
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
