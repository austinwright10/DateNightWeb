'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import {
  interestStore,
  priceStore,
  travelStore,
  userIDStore,
} from '@/app/stores/stores'
import { CheckOutlined, LeftOutlined } from '@ant-design/icons'

interface UserInfo {
  name: string
  phone_number: string
  location: string
  budget: string
  travel: string
  day: string
  interests: string[]
}

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    phone_number: '',
    location: '',
    budget: '',
    travel: '',
    day: '',
    interests: [],
  })

  const [editingPhone, setEditingPhone] = useState(false)
  const [editingLocation, setEditingLocation] = useState(false)
  const [editingBudget, setEditingBudget] = useState(false)
  const [editingTravel, setEditingTravel] = useState(false)
  const [editingDay, setEditingDay] = useState(false)

  const selectedPrice = priceStore((state: any) => state.price)
  const selectedTravel = travelStore((state: any) => state.travel)
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
        if (data) {
          console.log('data here ', data)
          setUserInfo({
            name: data.first_name + ' ' + data.last_name || '',
            phone_number: data.phone_number || '',
            location: data.location || '',
            budget: data.budget || '',
            travel: data.travel || '',
            day: data.day || '',
            interests: data.interests || [],
          })

          setTempPhone(data.phone_number || '')
          setTempLocation(data.location || '')
          setTempBudget(data.budget || '')
          setTempTravel(data.travel || '')
          setTempDay(data.day || '')
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
      updates.budget = tempBudget
    }
    if (tempTravel !== userInfo.travel) {
      updates.travel = tempTravel
    }
    if (tempDay !== userInfo.day) {
      updates.day = tempDay
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
      <div className='flex flex-row justify-between w-1/12 mb-7'>
        <LeftOutlined height={30} width={30} />
        <h1 className='text-3xl text-center font-bold'>Profile</h1>
      </div>
      {/* Name Section */}
      <div className='mb-6 border-b-2 border-black'>
        <label className='block text-xl font-medium mb-2'>Name</label>
        <div className='flex justify-between items-center'>
          <span className='text-lg'>{`${userInfo.name}`}</span>
          {/* <CheckOutlined
            onClick={() => {
              setTempPhone(userInfo.phone_number)
              setEditingPhone(true)
            }}
            className='cursor-pointer'
          /> */}
        </div>
      </div>

      {/* Phone Number Section */}
      <div className='mb-6 border-b-2 border-black'>
        <label className='block text-xl font-medium mb-2'>Phone Number</label>
        {!editingPhone ? (
          <div className='flex justify-between items-center'>
            <span className='text-lg'>{userInfo.phone_number}</span>
            {/* <CheckOutlined
              onClick={() => {
                setTempPhone(userInfo.phone_number)
                setEditingPhone(true)
              }}
              className='cursor-pointer'
            /> */}
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            <input
              className='input'
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
            />
            {/* <CheckOutlined onClick={handleSave} className='cursor-pointer' /> */}
          </div>
        )}
      </div>

      {/* Budget Section */}
      <div className='mb-6 border-b-2 border-black'>
        <label className='block text-xl font-medium mb-2'>Budget</label>
        {!editingBudget ? (
          <div className='flex justify-between items-center'>
            <span className='text-lg'>{userInfo.budget}</span>
            <CheckOutlined
              onClick={() => {
                setTempBudget(userInfo.budget)
                setEditingBudget(true)
              }}
              className='cursor-pointer'
            />
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            <input
              className='input'
              value={tempBudget}
              onChange={(e) => setTempBudget(e.target.value)}
            />
            <CheckOutlined onClick={handleSave} className='cursor-pointer' />
          </div>
        )}
      </div>

      {/* Travel Section */}
      <div className='mb-6 border-b-2 border-black'>
        <label className='block text-xl font-medium mb-2'>Travel</label>
        {!editingTravel ? (
          <div className='flex justify-between items-center'>
            <span className='text-lg'>{userInfo.travel}</span>
            <CheckOutlined
              onClick={() => {
                setTempTravel(userInfo.travel)
                setEditingTravel(true)
              }}
              className='cursor-pointer'
            />
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            <input
              className='input'
              value={tempTravel}
              onChange={(e) => setTempTravel(e.target.value)}
            />
            <CheckOutlined onClick={handleSave} className='cursor-pointer' />
          </div>
        )}
      </div>

      {/* Day Section */}
      <div className='mb-6 border-b-2 border-black'>
        <label className='block text-xl font-medium mb-2'>Date Night</label>
        {!editingDay ? (
          <div className='flex justify-between items-center'>
            <span className='text-lg'>{userInfo.day}</span>
            <CheckOutlined
              onClick={() => {
                setTempDay(userInfo.day)
                setEditingDay(true)
              }}
              className='cursor-pointer'
            />
          </div>
        ) : (
          <div className='flex justify-between items-center'>
            <input
              className='input'
              value={tempDay}
              onChange={(e) => setTempDay(e.target.value)}
            />
            <CheckOutlined onClick={handleSave} className='cursor-pointer' />
          </div>
        )}
      </div>

      {/* Interests Section */}
      <div className='mb-6 border-b-2 border-black'>
        <h2 className='text-xl font-medium mb-2'>Interests</h2>
        <div className='flex flex-wrap'>
          {interests.map((interest: string) => (
            <div
              key={interest}
              className={`m-2 px-4 py-2 rounded text-lg ${
                interests.includes(interest)
                  ? 'bg-buttonColor/100 text-white'
                  : 'bg-white border'
              }`}
            >
              {interest}
            </div>
          ))}
        </div>
      </div>

      <button
        className='bg-red-300 text-white px-6 py-2 rounded'
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  )
}

export default Profile
