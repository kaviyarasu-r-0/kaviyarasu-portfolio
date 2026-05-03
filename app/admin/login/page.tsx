'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('All fields required')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('admin-token', data.token)
        toast.success('Welcome back!')
        router.push('/admin/projects')
      } else {
        toast.error(data.error || 'Invalid credentials')
      }
    } catch {
      toast.error('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))', border: '1px solid rgba(0,245,255,0.2)' }}>
            <span className="font-display font-bold text-xl gradient-text">KR</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-white">Admin Login</h1>
          <p className="text-white/35 text-sm mt-1">Portfolio CMS Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="glass rounded-2xl p-7 border border-white/8 space-y-4">
          <div>
            <label className="text-white/40 text-xs font-mono mb-1.5 block">Email</label>
            <div className="relative">
              <FiMail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                placeholder="admin@kaviyarasu.dev"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-sm"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="text-white/40 text-xs font-mono mb-1.5 block">Password</label>
            <div className="relative">
              <FiLock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 text-sm"
                autoComplete="current-password"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all mt-2"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(0,245,255,0.3)',
              color: '#00f5ff',
            }}
            whileHover={{ scale: 1.01, boxShadow: '0 0 20px rgba(0,245,255,0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <motion.div className="w-4 h-4 rounded-full border-2 border-[#00f5ff]/30 border-t-[#00f5ff]"
                animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
            ) : (
              <><FiLogIn size={15} /> Login</>
            )}
          </motion.button>
        </form>

        <p className="text-center text-white/20 text-xs mt-6 font-mono">
          credentials set in .env.local
        </p>
      </motion.div>
    </div>
  )
}
