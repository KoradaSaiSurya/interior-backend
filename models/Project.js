import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  warranty: { type: String },
  content: { type: String, required: true },
});

export default mongoose.model("Project", projectSchema);
