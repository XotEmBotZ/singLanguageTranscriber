import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GestureCom',
  description: 'Bridging the communication gap',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar></NavBar>
        <main style={{ padding: '1rem var(--pagePadding)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
