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
import { useEffect, useState } from 'react'

export default function Modal({
  isOpen,
  phoneNumber,
  onBack,
  onContinue,
  otpValue,
  setOtpValue,
}: {
  isOpen: boolean
  phoneNumber: string
  onBack: () => void
  onContinue: () => void
  otpValue: string
  setOtpValue: (value: string) => void
}) {
  function formatPhoneNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return `(${match[1]})-${match[2]}-${match[3]}`
    }

    return phoneNumber
  }
  useEffect(() => {
    if (otpValue.length === 6) {
      onContinue()
    }
  }, [otpValue, onContinue])
  return (
    <Dialog open={isOpen}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogTitle className='text-xl'>Confirm Your Number</DialogTitle>
        <DialogHeader>
          <p className='text-left'>
            We sent a 6 digit code to {formatPhoneNumber(phoneNumber)}.
          </p>
          <DialogDescription>
            <div className='flex flex-col md:w-3/4 w-full max-w-md mx-auto m-3 space-y-6'>
              <InputOTP
                maxLength={6}
                value={otpValue}
                onChange={(value) => setOtpValue(value)}
              >
                <InputOTPGroup className='flex w-full justify-center'>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className='border border-black text-black w-full h-16 text-center text-xl'
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
