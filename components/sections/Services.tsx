'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiLayout, FiServer, FiRefreshCw, FiZap, FiShield } from 'react-icons/fi'

const services = [
  {
    icon: FiCode,
    title: 'Web Development',
    description:
      'Full-stack web apps using Next.js, React, TypeScript. From MVPs to production-scale platforms with clean, scalable architecture.',
    color: '#00f5ff',
    tags: ['Next.js', 'React', 'TypeScript'],
  },
  {
    icon: FiLayout,
    title: 'Admin Dashboard',
    description:
      'Custom internal tools and CMS dashboards with role-based access control, data tables, charts, and real-time updates.',
    color: '#7c3aed',
    tags: ['CRUD', 'Auth', 'Charts'],
  },
  {
    icon: FiServer,
    title: 'API Integration',
    description:
      'Connect your frontend to any backend or third-party service. REST, GraphQL, Webhooks, Stripe, Supabase, Firebase.',
    color: '#f472b6',
    tags: ['REST', 'GraphQL', 'Stripe'],
  },
  {
    icon: FiRefreshCw,
    title: 'UI Revamp',
    description:
      'Transform outdated interfaces into modern, high-converting designs. Pixel-perfect implementation from Figma or your vision.',
    color: '#a3e635',
    tags: ['Figma', 'Tailwind', 'Animations'],
  },
  {
    icon: FiZap,
    title: 'Performance Optimization',
    description:
      'Speed up slow websites with lazy loading, image optimization, code splitting, and Core Web Vitals improvements.',
    color: '#fbbf24',
    tags: ['Lighthouse', 'Core Web Vitals'],
  },
  {
    icon: FiShield,
    title: 'Auth & Security',
    description:
      'Implement secure authentication flows using JWT, NextAuth, OAuth (Google, GitHub) with protected routes and sessions.',
    color: '#34d399',
    tags: ['JWT', 'NextAuth', 'OAuth'],
  },
]

export default function Services() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="services" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-[#00f5ff]/60 text-sm font-mono mb-3">05. what I offer</p>
        <h2 className="font-display font-bold text-4xl md:text-5xl text-white">Services</h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#00f5ff] to-transparent" />
        <p className="text-white/40 mt-4 max-w-lg text-sm leading-relaxed">
          End-to-end web development services tailored for startups, businesses, and individuals looking to build modern digital products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${service.color}12`,
                  border: `1px solid ${service.color}25`,
                }}
              >
                <Icon size={22} style={{ color: service.color }} />
              </div>

              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed mb-4">{service.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{
                      background: `${service.color}10`,
                      border: `1px solid ${service.color}20`,
                      color: `${service.color}80`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${service.color}06 0%, transparent 60%)`,
                }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <p className="text-white/35 text-sm mb-4">Have a project in mind?</p>
        <motion.a
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="btn-primary inline-flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Let's Talk →
        </motion.a>
      </motion.div>
    </section>
  )
}
