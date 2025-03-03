import express from "express";
import fs from "fs";
import "dotenv/config";

const router = express.Router();
const tagsFilePath = process.env.TAGS_FILE_PATH;

// GET /tags for Returning all tags
router.get("/", (_req, res) => {
  try {
    const tags = JSON.parse(fs.readFileSync(tagsFilePath, "utf-8"));
    res.json(tags);
  } catch (error) {
    console.error("Error reading tags file:", error);
    res.status(500).json({ error: "Error reading tags data" });
  }
});

export default router;
