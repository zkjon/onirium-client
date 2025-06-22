import { type Metadata } from 'next'
import { Fira_Code, Fira_Mono } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'



const firaSans = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-sans',
  weight: ['400', '500', '700'],
})
const firaMono = Fira_Mono({
  subsets: ['latin'],
  variable: '--font-fira-mono',
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'Onirium',
  description: 'Onirium es un ejemplo de landing page con Clerk y Next.js 14 utilizando TypeScript.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en">
        <body className={`${firaSans.variable} ${firaMono.variable} antialiased`}>
          <ClerkProvider>
            {children}
          </ClerkProvider>
        </body>
      </html>
  )
}