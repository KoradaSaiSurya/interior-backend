// backend/routes/sitemapRoutes.js
import express from "express";
import Project from "../models/Project.js"; // ⚠️ .js extension in ESM

const router = express.Router();
const SITE_URL = process.env.SITE_URL || "https://luxe-spaces.vercel.app";

router.get("/sitemap.xml", async (req, res) => {
  try {
    const projects = await Project.find({}).sort({ updatedAt: -1 }).lean();

    const staticPages = [
      { url: "/", changefreq: "daily", priority: "1.0" },
      { url: "/about", changefreq: "monthly", priority: "0.6" },
      { url: "/projects", changefreq: "weekly", priority: "0.8" },
      { url: "/services", changefreq: "monthly", priority: "0.6" },
      { url: "/contact", changefreq: "monthly", priority: "0.5" },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    staticPages.forEach((p) => {
      xml += `  <url>
    <loc>${SITE_URL}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>\n`;
    });

    projects.forEach((proj) => {
      const slug = proj.slug || proj._id;
      const lastmod = proj.updatedAt
        ? new Date(proj.updatedAt).toISOString()
        : new Date().toISOString();
      xml += `  <url>
    <loc>${SITE_URL}/projects/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    console.error("Sitemap error:", err);
    res.status(500).end();
  }
});

export default router; // ✅ default export for ES Module
