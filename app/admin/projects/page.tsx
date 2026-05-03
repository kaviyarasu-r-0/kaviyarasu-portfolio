'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink, FiGithub, FiStar, FiX } from 'react-icons/fi'
import { AdminInput, AdminTextarea, TagInput, SubmitButton } from '@/components/admin/AdminFormFields'

interface Project {
  _id: string
  title: string
  description: string
  techStack: string[]
  image: string
  liveLink: string
  githubLink: string
  featured: boolean
  order: number
}

const emptyForm = {
  title: '', description: '', techStack: [] as string[],
  image: '', liveLink: '', githubLink: '', featured: false, order: 0,
}

function getAuthHeader() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin-token') : ''
  return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      if (data.success) setProjects(data.data)
    } catch { toast.error('Failed to load') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchProjects() }, [])

  const openNew = () => { setEditing(null); setForm(emptyForm); setShowForm(true) }
  const openEdit = (p: Project) => {
    setEditing(p)
    setForm({
      title: p.title, description: p.description, techStack: p.techStack,
      image: p.image, liveLink: p.liveLink, githubLink: p.githubLink,
      featured: p.featured, order: p.order,
    })
    setShowForm(true)
  }
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(emptyForm) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.description.trim()) { toast.error('Title and description required'); return }
    setSaving(true)
    try {
      const url = editing ? `/api/projects/${editing._id}` : '/api/projects'
      const method = editing ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: getAuthHeader(), body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) {
        toast.success(editing ? 'Project updated!' : 'Project added!')
        closeForm(); fetchProjects()
      } else { toast.error(data.error || 'Failed') }
    } catch { toast.error('Request failed') }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', headers: getAuthHeader() })
      const data = await res.json()
      if (data.success) { toast.success('Deleted'); fetchProjects() }
      else toast.error('Failed to delete')
    } catch { toast.error('Request failed') }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white">Projects</h1>
          <p className="text-white/30 text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} total</p>
        </div>
        <motion.button onClick={openNew} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(124,58,237,0.15))', border: '1px solid rgba(0,245,255,0.3)', color: '#00f5ff' }}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <FiPlus size={16} /> Add Project
        </motion.button>
      </div>

      {/* Projects grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="skeleton rounded-2xl h-48" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-white/25">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-lg font-display">No projects yet</p>
          <p className="text-sm mt-1">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <motion.div key={p._id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-2xl border border-white/5 overflow-hidden group">
              {/* Image placeholder */}
              <div className="h-32 bg-gradient-to-br from-[#0d0d1a] to-[#10101f] relative flex items-center justify-center">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-display font-bold text-white/10">{p.title.charAt(0)}</span>
                )}
                {p.featured && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                    style={{ background: 'rgba(0,245,255,0.15)', border: '1px solid rgba(0,245,255,0.3)', color: '#00f5ff' }}>
                    <FiStar size={9} fill="currentColor" /> Featured
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-white mb-1 truncate">{p.title}</h3>
                <p className="text-white/40 text-xs line-clamp-2 mb-3">{p.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {p.techStack.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded font-mono"
                      style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)', color: 'rgba(0,245,255,0.6)' }}>
                      {t}
                    </span>
                  ))}
                  {p.techStack.length > 3 && <span className="text-xs text-white/25">+{p.techStack.length - 3}</span>}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  {p.liveLink && <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#00f5ff] transition-colors"><FiExternalLink size={14} /></a>}
                  {p.githubLink && <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/70 transition-colors"><FiGithub size={14} /></a>}
                  <div className="ml-auto flex gap-2">
                    <button onClick={() => openEdit(p)} className="text-white/30 hover:text-[#00f5ff] transition-colors p-1.5 hover:bg-[#00f5ff]/10 rounded-lg"><FiEdit2 size={14} /></button>
                    <button onClick={() => handleDelete(p._id, p.title)} className="text-white/30 hover:text-red-400 transition-colors p-1.5 hover:bg-red-400/10 rounded-lg"><FiTrash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(8,8,16,0.85)', backdropFilter: 'blur(12px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) closeForm() }}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="glass rounded-2xl border border-white/10 w-full max-w-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="font-display font-bold text-white">{editing ? 'Edit Project' : 'New Project'}</h2>
                <button onClick={closeForm} className="text-white/40 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"><FiX size={18} /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <AdminInput label="Project Title *" placeholder="My Awesome App" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
                <AdminTextarea label="Description *" placeholder="What does this project do?" rows={3}
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <TagInput label="Tech Stack (Enter to add)" tags={form.techStack} placeholder="Next.js, TypeScript..."
                  onChange={(tags) => setForm({ ...form, techStack: tags })} />
                <AdminInput label="Image URL" placeholder="https://..." value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })} />
                <div className="grid grid-cols-2 gap-4">
                  <AdminInput label="Live Link" placeholder="https://myapp.com" value={form.liveLink}
                    onChange={(e) => setForm({ ...form, liveLink: e.target.value })} />
                  <AdminInput label="GitHub Link" placeholder="https://github.com/..." value={form.githubLink}
                    onChange={(e) => setForm({ ...form, githubLink: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <AdminInput label="Display Order" type="number" value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
                  <div className="flex items-end pb-0.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className={`w-10 h-5 rounded-full transition-colors relative ${form.featured ? 'bg-[#00f5ff]/40' : 'bg-white/10'}`}
                        onClick={() => setForm({ ...form, featured: !form.featured })}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? 'left-5' : 'left-0.5'}`} />
                      </div>
                      <span className="text-white/50 text-sm">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <SubmitButton loading={saving} label={editing ? 'Update Project' : 'Add Project'} />
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
