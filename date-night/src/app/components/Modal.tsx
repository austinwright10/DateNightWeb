import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

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
  return (
    <Dialog open={isOpen}>
      {/* <DialogTrigger asChild>
        <button className='hidden'>Open Modal</button>
      </DialogTrigger> */}
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Confirm your number</DialogTitle>
          <DialogDescription>
            <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto p-6 space-y-6'>
              <p className='text-center text-gray-700 text-lg'>
                {formatPhoneNumber(phoneNumber)} is the number we have. If
                correct, press continue.
              </p>
              <button
                onClick={onContinue}
                className='w-full py-3 px-4 bg-buttonColor text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Continue
              </button>
              <button
                onClick={onBack}
                className='w-full px-4 bg-none text-gray-700 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
              >
                Back
              </button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
