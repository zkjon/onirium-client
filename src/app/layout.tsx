import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Fira_Code, Fira_Mono } from 'next/font/google'
import './globals.css'

import { enUS } from '@clerk/localizations'

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
    <ClerkProvider localization={enUS}>
      <html lang="en">
        <body className={`${firaSans.variable} ${firaMono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton mode='modal' />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}