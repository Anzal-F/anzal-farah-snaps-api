import express from "express";
import cors from "cors";
import "dotenv/config";
import tagsRoutes from "./routes/tags.js";

const app = express();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());

// Routes
app.use("/tags", tagsRoutes);

// Default route
app.get("/", (_req, res) => res.send("Hello Express!"));

// Handles errors
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
