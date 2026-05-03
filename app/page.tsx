'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Services from '@/components/sections/Services'
import Reviews from '@/components/sections/Reviews'
import WhyHireMe from '@/components/sections/WhyHireMe'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

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

interface Review {
  _id: string
  name: string
  company: string
  role: string
  message: string
  rating: number
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, reviewsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/reviews'),
        ])
        const projectsData = await projectsRes.json()
        const reviewsData = await reviewsRes.json()
        if (projectsData.success) setProjects(projectsData.data)
        if (reviewsData.success) setReviews(reviewsData.data)
      } catch (err) {
        console.error('Failed to fetch data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="relative min-h-screen">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px]" />
      </div>

      <Navbar />
      <Hero />
      <Experience />
      {!loading && projects.length > 0 && <Projects projects={projects} />}
      <Skills />
      <Services />
      {!loading && reviews.length > 0 && <Reviews reviews={reviews} />}
      <WhyHireMe />
      <Contact />
      <Footer />
    </main>
  )
}
