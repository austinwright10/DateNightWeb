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
        <DialogTitle className='text-xl'>Confirm Your Number</DialogTitle>
        <DialogHeader>
          <DialogDescription>
            <div className='flex flex-col items-center justify-center justify-between w-full max-w-md mx-auto p-6 space-y-6'>
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
                className='text-black w-full'
              >
                <InputOTPGroup className='flex w-full'>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className='border border-black text-black w-full h-16 w-16 text-center text-xl'
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
