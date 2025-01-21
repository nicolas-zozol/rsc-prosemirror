export default function EmptyLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div>Empty layout</div>
      {children}
    </div>
  )
}
