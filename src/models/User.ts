import { UserDocument } from "@/types";
import mongoose, { Document, Model } from "mongoose";

const userSchema = new mongoose.Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  phone: { type: String, required: true, unique: true },
  idType: { type: String, required: true },
  frontImage: { type: String, required: true },
  backImage: { type: String, required: true },
  meetingStartTime: { type: String, required: true },
  meetingEndTime: { type: String, required: true },
  meetingUri: { type: String, required: true },
  plan: { type: String, required: true },
});

const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default User;
