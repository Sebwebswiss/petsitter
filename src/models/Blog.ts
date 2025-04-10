import mongoose, { Document, Model } from "mongoose";

interface BlogDocument extends Document {
  title: string;
  slug: string;
  description: string;
  publishDate: string;
  imageUrl: string;
}

const blogSchema = new mongoose.Schema<BlogDocument>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  publishDate: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Blog: Model<BlogDocument> = mongoose.models.Blog || mongoose.model<BlogDocument>("Blog", blogSchema);

export default Blog;
