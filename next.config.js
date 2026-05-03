/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'via.placeholder.com'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' }
    ]
  },
}

module.exports = nextConfig
