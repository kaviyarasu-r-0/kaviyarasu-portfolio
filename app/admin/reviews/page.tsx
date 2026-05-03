'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiX } from 'react-icons/fi'
import { AdminInput, AdminTextarea, SubmitButton } from '@/components/admin/AdminFormFields'

interface Review {
  _id: string
  name: string
  company: string
  role: string
  message: string
  rating: number
  approved: boolean
}

const emptyForm = { name: '', company: '', role: '', message: '', rating: 5, approved: true }

function getAuthHeader() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin-token') : ''
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-white/40 text-xs font-mono mb-1.5 block">Rating</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} type="button" onClick={() => onChange(s)}
            className={`transition-colors ${s <= value ? 'text-[#fbbf24]' : 'text-white/15 hover:text-white/40'}`}>
            <FiStar size={22} fill={s <= value ? 'currentColor' : 'none'} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Review | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchReviews = async () => {
    setLoading(true)
    try {
      // Fetch all (admin) — we pass auth here even though GET is public
      const res = await fetch('/api/reviews')
      const data = await res.json()
      if (data.success) setReviews(data.data)
    } catch { toast.error('Failed to load') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchReviews() }, [])

  const openNew = () => { setEditing(null); setForm(emptyForm); setShowForm(true) }
  const openEdit = (r: Review) => {
    setEditing(r)
    setForm({ name: r.name, company: r.company, role: r.role, message: r.message, rating: r.rating, approved: r.approved })
    setShowForm(true)
  }
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.company.trim() || !form.message.trim()) {
      toast.error('Name, company, and message are required'); return
    }
    setSaving(true)
    try {
      const url = editing ? `/api/reviews/${editing._id}` : '/api/reviews'
      const method = editing ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) {
        toast.success(editing ? 'Review updated!' : 'Review added!')
        closeForm(); fetchReviews()
      } else { toast.error(data.error || 'Failed') }
    } catch { toast.error('Request failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete review from "${name}"?`)) return
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE', headers: getAuthHeader() })
      const data = await res.json()
      if (data.success) { toast.success('Deleted'); fetchReviews() }
      else toast.error('Failed to delete')
    } catch { toast.error('Request failed') }
  }

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '—'

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Reviews</h1>
          <p className="text-white/30 text-sm mt-1">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            {reviews.length > 0 && <span className="ml-2 text-[#fbbf24]">★ {avgRating} avg</span>}
          </p>
        </div>
        <motion.button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))', border: '1px solid rgba(0,245,255,0.3)', color: '#00f5ff' }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <FiPlus size={16} /> Add Review
        </motion.button>
      </div>

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="skeleton rounded-2xl h-28" />)}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 text-white/25">
          <p className="text-4xl mb-4">⭐</p>
          <p className="text-lg font-display">No reviews yet</p>
          <p className="text-sm mt-1">Add client testimonials to display on your portfolio</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => {
            const initials = r.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            return (
              <motion.div key={r._id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl border border-white/5 p-5 flex gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
                  {initials}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="font-semibold text-white text-sm">{r.name}</span>
                      <span className="text-white/30 text-xs ml-2">{r.role && `${r.role} · `}{r.company}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <FiStar key={s} size={12} className={s <= r.rating ? 'text-[#fbbf24]' : 'text-white/15'} fill={s <= r.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{r.message}</p>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button onClick={() => openEdit(r)} className="text-white/25 hover:text-[#00f5ff] transition-colors p-1.5 hover:bg-[#00f5ff]/10 rounded-lg"><FiEdit2 size={13} /></button>
                  <button onClick={() => handleDelete(r._id, r.name)} className="text-white/25 hover:text-red-400 transition-colors p-1.5 hover:bg-red-400/10 rounded-lg"><FiTrash2 size={13} /></button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) closeForm() }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="glass rounded-2xl border border-white/10 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="font-display font-bold text-white">{editing ? 'Edit Review' : 'New Review'}</h2>
                <button onClick={closeForm} className="text-white/40 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"><FiX size={18} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <AdminInput label="Client Name *" placeholder="Ravi Kumar" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <AdminInput label="Company *" placeholder="Acme Corp" value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <AdminInput label="Role / Title" placeholder="CEO, Product Manager..." value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })} />
                <AdminTextarea label="Review Message *" placeholder="What did the client say?" rows={4}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <StarPicker value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />

                <div className="flex gap-3 pt-2">
                  <SubmitButton loading={saving} label={editing ? 'Update Review' : 'Add Review'} />
                  <button type="button" onClick={closeForm} className="px-4 py-2.5 rounded-xl text-sm text-white/40 hover:text-white/70 border border-white/10 hover:border-white/20 transition-all">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
