import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  content: { type: String, required: true },
});

export default mongoose.model("Project", projectSchema);
