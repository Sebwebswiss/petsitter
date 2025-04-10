import mongoose, { Schema, Document } from "mongoose";
import { Model } from "mongoose";

export interface IPet extends Document {
  petName: string;
  petBreed: string;
  petGender: string;
  petType: "Dog" | "Cat" | "Other";
  petDOB: Date;
  additionalDetails?: string;
  imageUrl?: string;
  user: mongoose.Types.ObjectId;
}

const PetSchema: Schema = new Schema(
  {
    petName: { type: String, required: true },
    petBreed: { type: String, required: true },
    petGender: { type: String, required: true },
    petType: {
      type: String,
      enum: ["Dog", "Cat", "Other"],
      required: true,
    },
    petDOB: { type: Date, required: true },
    additionalDetails: { type: String },
    imageUrl: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  },
  { timestamps: true }
)

const Pet: Model<IPet> =
  mongoose.models.Pet ||
  mongoose.model<IPet>("Pet", PetSchema);

export default Pet;
