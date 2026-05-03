'use client'

import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}
export function AdminInput({ label, error, ...props }: InputProps) {
  return (
    <div>
      <label className="text-white/40 text-xs font-mono mb-1.5 block">{label}</label>
      <input
        {...props}
        className={`w-full px-4 py-2.5 text-sm transition-all ${error ? 'border-red-400/50 focus:border-red-400' : ''}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}
export function AdminTextarea({ label, error, ...props }: TextareaProps) {
  return (
    <div>
      <label className="text-white/40 text-xs font-mono mb-1.5 block">{label}</label>
      <textarea
        {...props}
        className={`w-full px-4 py-2.5 text-sm resize-none transition-all ${error ? 'border-red-400/50' : ''}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

interface TagInputProps {
  label: string
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}
export function TagInput({ label, tags, onChange, placeholder }: TagInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = (e.target as HTMLInputElement).value.trim()
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
        (e.target as HTMLInputElement).value = ''
      }
    }
  }
  const remove = (tag: string) => onChange(tags.filter((t) => t !== tag))

  return (
    <div>
      <label className="text-white/40 text-xs font-mono mb-1.5 block">{label}</label>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Type and press Enter'}
        className="w-full px-4 py-2.5 text-sm"
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg font-mono"
              style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.18)', color: 'rgba(0,245,255,0.7)' }}
            >
              {tag}
              <button onClick={() => remove(tag)} className="hover:text-red-400 transition-colors">
                <FiX size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

interface SubmitButtonProps {
  loading: boolean
  label: string
  loadingLabel?: string
}
export function SubmitButton({ loading, label, loadingLabel = 'Saving...' }: SubmitButtonProps) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
      style={{
        background: 'linear-gradient(135deg, rgba(0,245,255,0.18), rgba(124,58,237,0.18))',
        border: '1px solid rgba(0,245,255,0.3)',
        color: '#00f5ff',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {loading ? (
        <motion.div className="w-4 h-4 rounded-full border-2 border-[#00f5ff]/30 border-t-[#00f5ff]"
          animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
      ) : null}
      {loading ? loadingLabel : label}
    </motion.button>
  )
}
