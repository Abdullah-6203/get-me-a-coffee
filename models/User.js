import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  Username: { type: String, required: true, unique: true },
  profilePic: { type: String },
  coverPic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  razorpayid : {type: String},
  razorpaysecret : {type: String},
});


export default mongoose.models.User || model('User', UserSchema);