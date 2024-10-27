export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className='bg-background'>{children}</main>
}
