'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCheckCircle, FiClock, FiCode, FiMessageSquare, FiTrendingUp, FiGlobe } from 'react-icons/fi'

const reasons = [
  {
    icon: FiCode,
    title: 'Clean, Scalable Code',
    description: 'Well-structured code with TypeScript, proper naming conventions, and modular architecture that any developer can maintain.',
    color: '#00f5ff',
    stat: '100%',
    statLabel: 'TypeScript',
  },
  {
    icon: FiClock,
    title: 'On-Time Delivery',
    description: 'I respect deadlines. Projects are planned carefully with milestones, and you get regular updates throughout development.',
    color: '#7c3aed',
    stat: '< 48h',
    statLabel: 'Response time',
  },
  {
    icon: FiTrendingUp,
    title: 'Real-World Experience',
    description: 'Not just tutorials — I build production platforms handling real users, authentication flows, and complex business logic.',
    color: '#f472b6',
    stat: '10+',
    statLabel: 'Projects shipped',
  },
  {
    icon: FiMessageSquare,
    title: 'Clear Communication',
    description: 'Regular Loom videos, GitHub updates, and Slack/email communication. You are never left wondering about progress.',
    color: '#a3e635',
    stat: '100%',
    statLabel: 'Transparency',
  },
  {
    icon: FiGlobe,
    title: 'Full-Stack Capability',
    description: 'From landing pages to full SaaS products — frontend, backend, database, deployment. One developer, complete solution.',
    color: '#fbbf24',
    stat: '5+',
    statLabel: 'Tech stacks',
  },
  {
    icon: FiCheckCircle,
    title: 'Post-Launch Support',
    description: 'I don\'t disappear after delivery. 2 weeks of free bug fixes and support included in every project.',
    color: '#34d399',
    stat: '2 weeks',
    statLabel: 'Free support',
  },
]

export default function WhyHireMe() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="why-hire-me" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-[#00f5ff]/60 text-sm font-mono mb-3">07. why choose me</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
          Why Hire Me?
        </h2>
        <p className="text-white/40 max-w-xl mx-auto text-sm leading-relaxed">
          More than code — I bring reliability, communication, and craftsmanship to every project.
        </p>
        <div className="mt-6 h-px w-24 bg-gradient-to-r from-[#00f5ff] to-transparent mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reasons.map((reason, i) => {
          const Icon = reason.icon
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Stat */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${reason.color}12`, border: `1px solid ${reason.color}20` }}
                >
                  <Icon size={20} style={{ color: reason.color }} />
                </div>
                <div className="text-right">
                  <div className="font-display font-bold text-lg" style={{ color: reason.color }}>
                    {reason.stat}
                  </div>
                  <div className="text-white/30 text-xs">{reason.statLabel}</div>
                </div>
              </div>

              <h3 className="font-display font-bold text-base text-white mb-2 group-hover:text-white transition-colors">
                {reason.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{reason.description}</p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top, ${reason.color}05 0%, transparent 60%)` }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Bottom CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 rounded-2xl overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(124,58,237,0.08))' }}
      >
        <div className="border border-white/8 rounded-2xl px-8 py-10 text-center relative z-10">
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">
            Ready to build something great?
          </h3>
          <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
            Let's turn your idea into a production-ready product. Available for projects starting immediately.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Start a Project →
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              className="btn-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download Resume
            </motion.a>
          </div>
        </div>
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 blur-[60px]"
          style={{ background: 'radial-gradient(circle, #00f5ff, transparent)' }} />
      </motion.div>
    </section>
  )
}
