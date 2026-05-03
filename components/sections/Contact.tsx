'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { FiMail, FiUser, FiMessageSquare, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Contact() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'Message too short'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Message sent! I\'ll get back to you soon.')
        setForm({ name: '', email: '', message: '' })
      } else {
        toast.error(data.error || 'Something went wrong')
      }
    } catch {
      toast.error('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-[#00f5ff]/60 text-sm font-mono mb-3">08. get in touch</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white">Contact</h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#00f5ff] to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">Let's work together</h3>
            <p className="text-white/45 text-sm leading-relaxed">
              Have a project in mind? I'd love to hear about it. Drop me a message and let's discuss how I can help bring your vision to life.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: FiMail, label: 'Email', value: 'kaviyarasurajendran0@gmail.com', href: 'mailto:kaviyarasurajendran0@gmail.com' },
              { icon: FiGithub, label: 'GitHub', value: 'github.com/kaviyarasu-r-0', href: 'https://github.com/kaviyarasu-r-0' },
              { icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/kaviyarasu-rajendran-504852406', href: 'https://www.linkedin.com/in/kaviyarasu-rajendran-504852406' },
            ].map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl glass border border-white/5 hover:border-white/10 transition-all group"
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#00f5ff]" />
                </div>
                <div>
                  <p className="text-white/30 text-xs">{label}</p>
                  <p className="text-white/70 text-sm group-hover:text-white transition-colors">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Availability */}
          <div className="p-4 rounded-xl" style={{ background: 'rgba(0,245,255,0.04)', border: '1px solid rgba(0,245,255,0.12)' }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              <span className="text-[#34d399] text-sm font-medium">Available for work</span>
            </div>
            <p className="text-white/35 text-xs leading-relaxed">
              Currently accepting new freelance projects. Typical response within 24 hours.
            </p>
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 border border-white/5 space-y-5">
            {/* Name */}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block font-mono">Your Name</label>
              <div className="relative">
                <FiUser size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Kaviyarasu Rajendran"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 text-sm transition-all"
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block font-mono">Email Address</label>
              <div className="relative">
                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  placeholder="kavi@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 text-sm transition-all"
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="text-white/50 text-xs mb-1.5 block font-mono">Message</label>
              <div className="relative">
                <FiMessageSquare size={15} className="absolute left-3.5 top-3.5 text-white/30" />
                <textarea
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 text-sm resize-none transition-all"
                />
              </div>
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading ? 'rgba(0,245,255,0.1)' : 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))',
                border: '1px solid rgba(0,245,255,0.3)',
                color: '#00f5ff',
              }}
              whileHover={!loading ? { scale: 1.01, boxShadow: '0 0 25px rgba(0,245,255,0.15)' } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <motion.div
                  className="w-4 h-4 rounded-full border-2 border-[#00f5ff]/30 border-t-[#00f5ff]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <FiSend size={15} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
