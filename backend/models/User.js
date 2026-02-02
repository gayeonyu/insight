import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },

    nickname: {
      type: String,
      required: true,
      minlength: 2,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    testResults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
      },
    ],

    likedTests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', UserSchema);