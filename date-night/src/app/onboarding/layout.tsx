export default function OnboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='bg-gradient-to-t from-pink-100 to-background'>
      {children}
    </main>
  )
}
