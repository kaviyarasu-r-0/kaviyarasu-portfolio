import type { Metadata } from 'next'
import { Syne, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Kaviyarasu R — Web Developer',
  description: 'Frontend-focused developer building real-world platforms using Next.js, React, TypeScript, Tailwind, REST & GraphQL. Available for freelance projects.',
  keywords: ['web developer', 'Next.js', 'React', 'TypeScript', 'frontend developer', 'freelance'],
  authors: [{ name: 'Kaviyarasu R' }],
  openGraph: {
    title: 'Kaviyarasu R — Web Developer',
    description: 'Frontend-focused developer building real-world platforms.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#080810] text-slate-200 antialiased">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#10101f',
              color: '#e2e8f0',
              border: '1px solid rgba(0,245,255,0.2)',
              fontFamily: 'var(--font-syne)',
            },
          }}
        />
        {children}
      </body>
    </html>
  )
}
