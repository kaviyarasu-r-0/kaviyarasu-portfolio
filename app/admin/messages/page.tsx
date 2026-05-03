'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiMail, FiClock, FiUser, FiMessageSquare } from 'react-icons/fi'

interface ContactMessage {
  _id: string
  name: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/contact')
        const data = await res.json()
        if (data.success) setMessages(data.data)
      } catch { toast.error('Failed to load') }
      finally { setLoading(false) }
    }
    fetchMessages()
  }, [])

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white">Messages</h1>
        <p className="text-white/30 text-sm mt-1">
          {messages.length} total
          {unread > 0 && <span className="ml-2 text-[#00f5ff]">· {unread} unread</span>}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="skeleton rounded-2xl h-20" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-20 text-white/25">
          <p className="text-4xl mb-4">📬</p>
          <p className="text-lg font-display">No messages yet</p>
          <p className="text-sm mt-1">Contact form submissions will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="space-y-2">
            {messages.map((m) => (
              <motion.button
                key={m._id}
                onClick={() => setSelected(m)}
                className={`w-full text-left glass rounded-xl border p-4 transition-all ${
                  selected?._id === m._id
                    ? 'border-[#00f5ff]/30 bg-[#00f5ff]/5'
                    : 'border-white/5 hover:border-white/10'
                }`}
                whileHover={{ x: 2 }}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                    {!m.read && <span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] flex-shrink-0" />}
                    {m.name}
                  </span>
                  <span className="text-white/25 text-xs flex-shrink-0">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/35 text-xs mb-1">{m.email}</p>
                <p className="text-white/45 text-xs line-clamp-1">{m.message}</p>
              </motion.button>
            ))}
          </div>

          {/* Detail */}
          <div>
            {selected ? (
              <motion.div
                key={selected._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl border border-white/8 p-6 sticky top-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
                    <FiUser size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{selected.name}</p>
                    <p className="text-white/35 text-xs">{selected.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-white/25 text-xs mb-4">
                  <FiClock size={12} />
                  {new Date(selected.createdAt).toLocaleString()}
                </div>

                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-1.5 text-white/30 text-xs mb-3">
                    <FiMessageSquare size={12} />
                    Message
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                <a
                  href={`mailto:${selected.email}?subject=Re: Your message&body=Hi ${selected.name},%0D%0A%0D%0A`}
                  className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}
                >
                  <FiMail size={14} />
                  Reply via Email
                </a>
              </motion.div>
            ) : (
              <div className="glass rounded-2xl border border-white/5 p-8 text-center text-white/20">
                <FiMail size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a message to view</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
