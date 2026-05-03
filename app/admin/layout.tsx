'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGrid, FiStar, FiMail, FiLogOut, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'

const navItems = [
  { label: 'Projects', href: '/admin/projects', icon: FiGrid },
  { label: 'Reviews', href: '/admin/reviews', icon: FiStar },
  { label: 'Messages', href: '/admin/messages', icon: FiMail },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin-token')
    if (!token && pathname !== '/admin/login') {
      router.replace('/admin/login')
    } else {
      setChecking(false)
    }
  }, [pathname, router])

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    localStorage.removeItem('admin-token')
    toast.success('Logged out')
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>
  if (checking) {
    return (
      <div className="min-h-screen bg-[#080810] flex items-center justify-center">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-[#00f5ff]/20 border-t-[#00f5ff]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#080810] flex">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-lg gradient-text">KR</span>
            <span className="text-white/30 text-xs">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? 'bg-[#00f5ff]/10 text-[#00f5ff] border border-[#00f5ff]/20'
                    : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <FiExternalLink size={13} />
            View Portfolio
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <FiLogOut size={13} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
