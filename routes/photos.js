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


export default router;