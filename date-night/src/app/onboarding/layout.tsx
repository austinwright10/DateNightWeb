export default function OnboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='bg-gradient-to-t from-background to-pink-100'>
      {children}
    </main>
  )
}
