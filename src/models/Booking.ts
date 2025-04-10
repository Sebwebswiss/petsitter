import mongoose, { Document, Model } from "mongoose";

interface BookingDocument extends Document {
  user: mongoose.Types.ObjectId;
  startDate: string;
  endDate: string;
  
  startTime: string;
  endTime: string;
  
  servicetype: string;
  frequency: string;
}

const BookingSchema = new mongoose.Schema<BookingDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
 
  startTime: { type: String},
  endTime: { type: String},
 
  servicetype: { type: String, required: true },
  frequency: { type: String, required: true },
}, {timestamps: true});

const Booking: Model<BookingDocument> =
  mongoose.models.Booking ||
  mongoose.model<BookingDocument>("Booking", BookingSchema);

export default Booking;
