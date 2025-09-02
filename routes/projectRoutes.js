// import express from "express";
// import multer from "multer";
// import Project from "../models/Project.js";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// const router = express.Router();

// // ✅ Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // ✅ Multer-Cloudinary Storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "projects",
//     allowed_formats: ["jpg", "png", "jpeg", "webp"],
//   },
// });

// const upload = multer({ storage });

// // 📌 POST: Upload Project
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { title, price, warranty, content } = req.body;

//     const newProject = new Project({
//       title,
//       price,
//       warranty,
//       content,
//       imageUrl: req.file.path, // 🔥 Cloudinary URL
//     });

//     await newProject.save();
//     res.json(newProject);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 📌 GET: Fetch All Projects
// router.get("/", async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // 📌 DELETE: Delete Project
// router.delete("/:id", async (req, res) => {
//   try {
//     await Project.findByIdAndDelete(req.params.id);
//     res.json({ message: "Project deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;




import express from "express";
import multer from "multer";
import Project from "../models/Project.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer–Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "projects",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ max 5MB
});

// POST: Upload Project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, price, warranty, content } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProject = new Project({
      title,
      price,
      warranty,
      content,
      imageUrl: req.file.path, // ✅ Cloudinary URL
    });

    await newProject.save();
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE: Delete Project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
