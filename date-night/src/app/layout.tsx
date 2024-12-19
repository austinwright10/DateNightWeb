import './globals.css'
import { Metadata } from 'next'

const metadata: Metadata = {
  title: 'Date Night',
  description: '-',
  icons: {
    icon: '@/public/icon.png',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-gradient-to-t from-pink-100 to-background'>
        {children}
      </body>
    </html>
  )
}
