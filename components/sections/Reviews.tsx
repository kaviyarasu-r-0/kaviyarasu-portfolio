'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Review {
  _id: string
  name: string
  company: string
  role: string
  message: string
  rating: number
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          size={13}
          className={star <= rating ? 'text-[#fbbf24]' : 'text-white/15'}
          fill={star <= rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, isActive }: { review: Review; isActive: boolean }) {
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.4, scale: isActive ? 1 : 0.92 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass rounded-2xl p-7 border transition-all duration-500 ${
        isActive ? 'border-[#00f5ff]/20 shadow-[0_0_40px_rgba(0,245,255,0.05)]' : 'border-white/5'
      }`}
    >
      {/* Quote mark */}
      <div className="text-5xl font-display text-[#00f5ff]/10 leading-none mb-4 select-none">"</div>

      <p className="text-white/65 text-base leading-relaxed mb-6 italic">{review.message}</p>

      {/* Rating */}
      <StarRating rating={review.rating} />

      {/* Author */}
      <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/5">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,245,255,0.2), rgba(124,58,237,0.2))',
            border: '1px solid rgba(0,245,255,0.2)',
            color: '#00f5ff',
          }}
        >
          {initials}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{review.name}</p>
          <p className="text-white/35 text-xs">
            {review.role && `${review.role} · `}{review.company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reviews({ reviews }: { reviews: Review[] }) {
  const [current, setCurrent] = useState(0)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)
  const next = () => setCurrent((c) => (c + 1) % reviews.length)

  // Show up to 3 reviews at a time
  const visible = reviews.slice(current, current + 3)
  if (visible.length < 3) visible.push(...reviews.slice(0, 3 - visible.length))

  return (
    <section id="reviews" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-[#00f5ff]/60 text-sm font-mono mb-3">06. client feedback</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">Reviews</h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#00f5ff] to-transparent" />
        </div>

        {reviews.length > 3 && (
          <div className="flex gap-2">
            <motion.button
              onClick={prev}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronLeft size={16} />
            </motion.button>
            <motion.button
              onClick={next}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronRight size={16} />
            </motion.button>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(reviews.length <= 3 ? reviews : visible).map((review, i) => (
          <ReviewCard key={review._id} review={review} isActive={i === 0 || reviews.length <= 3} />
        ))}
      </div>

      {/* Dots */}
      {reviews.length > 3 && (
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-6 h-2 bg-[#00f5ff]' : 'w-2 h-2 bg-white/15'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
