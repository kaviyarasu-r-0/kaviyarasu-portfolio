'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight } from 'react-icons/fi'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#00f5ff]/20 text-sm text-[#00f5ff]/80">
            <span className="w-2 h-2 rounded-full bg-[#00f5ff] animate-pulse" />
            Available for freelance work
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1 variants={itemVariants} className="font-display font-bold leading-[1.1] mb-6">
          <span className="block text-5xl md:text-7xl lg:text-8xl text-white/90 mb-2">
            Kaviyarasu R
          </span>
          <span className="block text-3xl md:text-5xl lg:text-6xl gradient-text">
            Web Developer
          </span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div variants={itemVariants} className="text-xl md:text-2xl text-white/40 mb-6 font-mono h-8">
          <TypeAnimation
            sequence={[
              'Next.js Developer', 2000,
              'React Specialist', 2000,
              'TypeScript Expert', 2000,
              'UI/UX Craftsman', 2000,
              'API Integrator', 2000,
              'Freelancer', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-[#00f5ff]/60"
          />
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={itemVariants}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Frontend-focused developer with{' '}
          <span className="text-[#00f5ff]/80">1 year of experience</span> building
          real-world platforms using Next.js, React, TypeScript, Tailwind, REST & GraphQL.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #00f5ff22, #7c3aed33)',
              border: '1px solid rgba(0,245,255,0.4)',
              color: '#00f5ff',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Hire Me</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-secondary flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Work
          </motion.a>

          <motion.a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm text-white/50 hover:text-white/80 transition-all border border-white/10 hover:border-white/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiDownload size={15} />
            Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4">
          {[
            { icon: FiGithub, href: 'https://github.com/kaviyarasu-r-0', label: 'GitHub' },
            { icon: FiLinkedin, href: 'https://www.linkedin.com/in/kaviyarasu-rajendran-504852406', label: 'LinkedIn' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-[#00f5ff] hover:border-[#00f5ff]/30 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
          <div className="w-px h-6 bg-white/10 mx-1" />
          <span className="text-white/25 text-sm font-mono">@kaviyarasuR</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
        <span className="text-xs font-mono">scroll</span>
      </motion.div>
    </section>
  )
}
