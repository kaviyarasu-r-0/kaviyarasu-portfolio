'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'

interface Project {
  _id: string
  title: string
  description: string
  techStack: string[]
  image: string
  liveLink?: string
  githubLink?: string
  featured: boolean
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="animated-border group relative"
    >
      <div className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] to-[#10101f] aspect-video">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-display font-bold opacity-10 text-white select-none">
                {project.title.charAt(0)}
              </div>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(ellipse at center, rgba(0,245,255,0.3) 0%, transparent 70%)`,
                }}
              />
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00f5ff]/15 border border-[#00f5ff]/30 text-[#00f5ff] text-xs">
              <FiStar size={10} fill="currentColor" />
              Featured
            </div>
          )}

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#00f5ff] transition-colors">
            {project.title}
          </h3>
          <p className="text-white/45 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-0.5 rounded font-mono"
                style={{
                  background: 'rgba(0,245,255,0.06)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  color: 'rgba(0,245,255,0.6)',
                }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 5 && (
              <span className="text-xs text-white/30 px-2 py-0.5">+{project.techStack.length - 5}</span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <FiGithub size={14} />
                Code
              </motion.a>
            )}
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#00f5ff]/50 hover:text-[#00f5ff] transition-colors ml-auto"
                whileHover={{ scale: 1.05 }}
              >
                Live Demo
                <FiExternalLink size={13} />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ projects }: { projects: Project[] }) {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="projects" className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-[#00f5ff]/60 text-sm font-mono mb-3">03. portfolio</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Projects
          </h2>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-[#00f5ff] to-transparent" />
        </div>
        <p className="text-white/35 text-sm max-w-xs text-right">
          {projects.length} project{projects.length !== 1 ? 's' : ''} built & shipped
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
