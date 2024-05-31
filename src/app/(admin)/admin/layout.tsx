import AdminSidebar from '@/components/navigation/admin-sidebar'

export const metadata = {
  title: "Let'sJom | Admin",
  description: "Let'sJom admin CMS.",
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default AdminLayout
