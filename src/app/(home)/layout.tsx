import Footer from '@/components/global/footer'
import Navbar from '@/components/navigation/navbar'

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b-[1px] py-5">
        <Navbar />
      </div>
      {children}
      <div className="mt-auto border-t-[1px] py-3">
        <Footer />
      </div>
    </div>
  )
}

export default HomeLayout
