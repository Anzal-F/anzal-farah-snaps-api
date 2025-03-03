import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";
import tagsRoutes from "./routes/tags.js";
import photosRoutes from "./routes/photos.js";

const app = express();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());


app.use("/images", express.static(path.resolve("public/images")));


app.use("/tags", tagsRoutes);
app.use("/photos", photosRoutes);

app.get("/", (_req, res) => res.send("Hello Express!"));


app.use((_req, res) => res.status(404).json({ message: "Route not found" }));

app.listen(port, () => console.log(`Server running on port ${port}`));
