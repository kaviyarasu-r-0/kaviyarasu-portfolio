'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi'

const experiences = [
  {
    role: 'Frontend Developer',
    company: 'Tech Startup / Freelance',
    location: 'Remote',
    period: 'Jan 2024 — Present',
    type: 'Full-time',
    description:
      'Building full-stack web applications using Next.js, TypeScript, and Tailwind CSS. Integrated REST and GraphQL APIs, implemented authentication, and deployed on Vercel + AWS.',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'GraphQL', 'MongoDB'],
    color: '#00f5ff',
  },
  {
    role: 'React Developer Intern',
    company: 'Software Agency',
    location: 'Chennai, India',
    period: 'Jun 2023 — Dec 2023',
    type: 'Internship',
    description:
      'Developed reusable UI components in React and contributed to real client projects. Worked with REST APIs, state management (Redux), and version control with Git.',
    tech: ['React', 'Redux', 'REST API', 'Git', 'SCSS'],
    color: '#7c3aed',
  },
]

function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full mt-1 flex-shrink-0 relative z-10"
          style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}60` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
        />
        {!isLast && (
          <motion.div
            className="w-px flex-1 mt-2 min-h-[80px]"
            style={{ background: `linear-gradient(to bottom, ${exp.color}40, transparent)` }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 flex-1">
        <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#00f5ff] transition-colors">
                {exp.role}
              </h3>
              <div className="flex items-center gap-1.5 text-white/50 mt-1 text-sm">
                <FiBriefcase size={13} />
                <span>{exp.company}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: `${exp.color}15`,
                  color: exp.color,
                  border: `1px solid ${exp.color}30`,
                }}
              >
                {exp.type}
              </span>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-xs text-white/35 mb-4">
            <span className="flex items-center gap-1">
              <FiCalendar size={12} />
              {exp.period}
            </span>
            <span className="flex items-center gap-1">
              <FiMapPin size={12} />
              {exp.location}
            </span>
          </div>

          <p className="text-white/55 text-sm leading-relaxed mb-4">{exp.description}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-lg font-mono"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="experience" className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Section header */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-[#00f5ff]/60 text-sm font-mono mb-3">02. background</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
          Experience
        </h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#00f5ff] to-transparent" />
      </motion.div>

      {/* Timeline */}
      <div>
        {experiences.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} isLast={i === experiences.length - 1} />
        ))}
      </div>
    </section>
  )
}
