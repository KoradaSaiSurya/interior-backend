import express from "express";
import multer from "multer";
import Project from "../models/Project.js";
import path from "path";

const router = express.Router();

// Storage setup for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage });

// POST: Upload new project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { price, content } = req.body;
    const newProject = new Project({
      imageUrl: `/uploads/${req.file.filename}`,
      price,
      content,
    });
    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Remove project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
