import mongoose from 'mongoose';

const ChoiceSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    text: String,
    dimension: {
      type: String,
      enum: ['EI', 'SN', 'TF', 'JP'],
      required: true,
    },
    value: {
      type: String,
      enum: ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'],
      required: true,
    },
  }
);

export default mongoose.model('Choice', ChoiceSchema);