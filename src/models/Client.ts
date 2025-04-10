import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface SecurityQuestions {
  maidenName: string;
  favoriteFood: string;
}

interface ClientDocument extends Document {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  compareSecurityAnswer(
    question: keyof SecurityQuestions,
    answer: string
  ): Promise<boolean>;
}


const clientSchema = new mongoose.Schema<ClientDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  image: { type: String },
  email: { type: String, required: false },
  password: { type: String, required: true },
});

clientSchema.pre("save", async function (next) {
  const client = this as ClientDocument;

  if (!client.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(client.password, salt);
  client.password = hashedPassword;
  next();
});

clientSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

clientSchema.methods.compareSecurityAnswer = async function (
  question: keyof SecurityQuestions,
  candidateAnswer: string
): Promise<boolean> {
  if (!this.securityAnswers || !(question in this.securityAnswers)) {
    throw new Error("Security answers not found");
  }

  return bcrypt.compare(candidateAnswer, this.securityAnswers[question]);
};

const Client: Model<ClientDocument> =
  mongoose.models.Client ||
  mongoose.model<ClientDocument>("Client", clientSchema);

export default Client;
