import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { useState } from 'react'

export default function Modal({
  isOpen,
  phoneNumber,
  onBack,
  onContinue,
}: {
  isOpen: boolean
  phoneNumber: string
  onBack: () => void
  onContinue: () => void
}) {
  function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`
    }

    return phoneNumber
  }
  const [value, setValue] = useState('')
  return (
    <Dialog open={isOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-xl'>Confirm Your Number</DialogTitle>
          <DialogDescription>
            <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 space-y-6'>
              {/* <p className='text-center text-gray-700 text-lg'>
                {formatPhoneNumber(phoneNumber)} is the number we have. If
                correct, press continue.
              </p>
              <button
                onClick={onContinue}
                className='w-full py-3 px-4 bg-buttonColor text-white font-medium rounded-lg transition-colors'
              >
                Continue
              </button>
              <button
                onClick={onBack}
                className='w-full px-4 bg-none text-gray-700 font-medium rounded-lg transition-colors'
              >
                Back
              </button> */}
              <InputOTP maxLength={6} value={value}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} className='border-1 border-black' />
                  <InputOTPSlot index={1} className='border-1 border-black' />
                  <InputOTPSlot index={2} className='border-1 border-black' />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} className='border-1 border-black' />
                  <InputOTPSlot index={4} className='border-1 border-black' />
                  <InputOTPSlot index={5} className='border-1 border-black' />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
