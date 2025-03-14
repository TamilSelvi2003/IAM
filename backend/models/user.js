import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String, 
      default: 'user', 
    },
    password: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ['active', 'inactive'] } 
    
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
