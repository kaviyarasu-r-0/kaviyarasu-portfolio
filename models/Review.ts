import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  name: string
  company: string
  role: string
  message: string
  rating: number
  avatar?: string
  approved: boolean
  createdAt: Date
}

const ReviewSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, default: '' },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatar: { type: String, default: '' },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)
