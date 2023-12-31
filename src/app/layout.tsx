import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  ...props
}: {
  children: React.ReactNode
  checkout: React.ReactNode
  identity: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='w-full md:w-3/4 lg:w-1/2 mx-auto grid min-h-screen items-center'>
          {props.checkout}
          {props.identity}
        </main>
      </body>
    </html>
  )
}
