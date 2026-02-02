import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    thumbnail: String,
    banner: String,
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Test', TestSchema);