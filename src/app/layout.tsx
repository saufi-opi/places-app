import '@/styles/globals.css'

import { Fira_Code } from 'next/font/google'

const fira = Fira_Code({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: "Let'sJom",
  description: 'Discover and explore amazing places around you',
  icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fira.className}`}>
      <body>{children}</body>
    </html>
  )
}
