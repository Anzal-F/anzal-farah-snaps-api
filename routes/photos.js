import express from "express";
import fs from "fs";
import "dotenv/config";

const router = express.Router();
const photosFilePath = process.env.PHOTOS_FILE_PATH;


const readPhotos = () => {
  try {
    return JSON.parse(fs.readFileSync(photosFilePath, "utf-8"));
  } catch (error) {
    console.error("Error reading photos file:", error);
    return [];
  }
};

// GET /photos - Return all photos
router.get("/", (_req, res) => {
  const photos = readPhotos();
  res.json(photos);
});

// GET /photos/:id for Returning a single photo by ID
router.get("/:id", (req, res) => {
    const photos = readPhotos();
    const photo = photos.find((p) => p.id === req.params.id);
    photo ? res.json(photo) : res.status(404).json({ error: "Photo not found" });
  });

  // GET /photos/:id/comments for Returning comments for a photo
router.get("/:id/comments", (req, res) => {
    const photos = readPhotos();
    const photo = photos.find((p) => p.id === req.params.id);
    photo ? res.json(photo.comments) : res.status(404).json({ error: "Photo not found" });
  });


  // POST /photos/:id/comments for Adding a new comment
router.post("/:id/comments", (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) return res.status(400).json({ error: "Name and comment are required" });
  
    const photos = readPhotos();
    const photo = photos.find((p) => p.id === req.params.id);
    if (!photo) return res.status(404).json({ error: "Photo not found" });
  
    const newComment = { id: Date.now().toString(), name, comment, timestamp: Date.now() };
    photo.comments.push(newComment);

 // Saving the new updated data
  try {
    fs.writeFileSync(photosFilePath, JSON.stringify(photos, null, 2));
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Failed to save comment" });
  }
});

export default router;