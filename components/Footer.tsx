'use client'

import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export const socials = [
  { icon: FiGithub, href: 'https://github.com/kaviyarasu-r-0', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/kaviyarasu-rajendran-504852406', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:kaviyarasurajendran0@gmail.com', label: 'Email' },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-white/5 mt-8">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#00f5ff]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-white/25 text-sm font-mono mb-2">ready to collaborate?</p>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-5">
            Let's work{' '}
            <span className="gradient-text">together</span>
          </h3>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a Conversation →
          </motion.a>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/5 mb-8" />

        {/* Links + Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="font-display font-bold text-lg gradient-text">KR</span>
            <span className="text-white/20 mx-1.5">·</span>
            <span className="text-white/30 text-sm">Kaviyarasu R</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white/35 hover:text-white/70 text-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg glass border border-white/8 flex items-center justify-center text-white/40 hover:text-[#00f5ff] hover:border-[#00f5ff]/25 transition-all"
                whileHover={{ scale: 1.1, y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-lg glass border border-white/8 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all ml-2"
              whileHover={{ scale: 1.1, y: -1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <FiArrowUp size={15} />
            </motion.button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs font-mono">
            © {new Date().getFullYear()} Kaviyarasu R · Built with Next.js, Tailwind & ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}
