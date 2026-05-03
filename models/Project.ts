import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  techStack: string[]
  image: string
  liveLink?: string
  githubLink?: string
  featured: boolean
  order: number
  createdAt: Date
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    techStack: [{ type: String, trim: true }],
    image: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    githubLink: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
