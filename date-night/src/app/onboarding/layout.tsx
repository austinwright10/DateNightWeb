export default function OnboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className='bg-background'>{children}</main>
}
