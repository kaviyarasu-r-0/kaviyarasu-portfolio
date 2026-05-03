'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(section)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 backdrop-blur-xl bg-[#080810]/80 border-b border-white/5'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-display font-bold text-xl"
            whileHover={{ scale: 1.02 }}
          >
            <span className="gradient-text">KR</span>
            <span className="text-white/40 mx-1">·</span>
            <span className="text-white/60 text-sm font-normal">dev</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '')
              const isActive = activeSection === id
              return (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive ? 'text-[#00f5ff]' : 'text-white/50 hover:text-white/90'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.button>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
              className="btn-primary text-xs px-4 py-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Hire Me →
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className={`w-5 h-4 flex flex-col justify-between transition-all ${mobileOpen ? 'gap-0' : 'gap-1'}`}>
              <span className={`block h-0.5 bg-current rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 right-4 z-40 glass rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </button>
              ))}
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }} className="btn-primary text-center mt-2">
                Hire Me →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
