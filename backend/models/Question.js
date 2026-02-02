import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Test',
      required: true, 
    },
    text: String,
    order: Number,
  }
);

export default mongoose.model('Question', QuestionSchema);