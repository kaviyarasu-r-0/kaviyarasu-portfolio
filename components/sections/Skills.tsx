'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    label: 'Frontend',
    color: '#00f5ff',
    skills: [
      { name: 'Next.js', level: 90 },
      { name: 'React', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 78 },
    ],
  },
  {
    label: 'Backend',
    color: '#7c3aed',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 72 },
      { name: 'REST APIs', level: 88 },
      { name: 'GraphQL', level: 70 },
      { name: 'MongoDB', level: 80 },
    ],
  },
  {
    label: 'Tools & Other',
    color: '#f472b6',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Vercel', level: 88 },
      { name: 'Figma', level: 72 },
      { name: 'Docker', level: 55 },
      { name: 'AWS (basics)', level: 50 },
    ],
  },
]

const techIcons = [
  'Next.js', 'React', 'TypeScript', 'Tailwind', 'Node.js',
  'MongoDB', 'GraphQL', 'Git', 'Vercel', 'Figma',
  'Express', 'REST', 'Docker', 'AWS', 'Redux',
]

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">{name}</span>
        <span className="text-xs font-mono" style={{ color: `${color}80` }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const iconsRef = useRef(null)
  const iconsInView = useInView(iconsRef, { once: true })

  return (
    <section id="skills" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-[#00f5ff]/60 text-sm font-mono mb-3">04. expertise</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white">Skills</h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#00f5ff] to-transparent" />
      </motion.div>

      {/* Skill bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: gi * 0.15 }}
            className="glass rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
              <span className="font-display font-semibold text-white">{group.label}</span>
            </div>
            <div className="space-y-4">
              {group.skills.map((skill, si) => (
                <SkillBar key={skill.name} {...skill} color={group.color} index={si} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech cloud */}
      <motion.div
        ref={iconsRef}
        className="flex flex-wrap justify-center gap-3"
      >
        {techIcons.map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={iconsInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            whileHover={{ scale: 1.08, y: -2 }}
            className="px-4 py-2 rounded-xl text-sm font-mono cursor-default"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
