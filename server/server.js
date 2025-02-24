import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 5000;

// Define directory paths
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");
const coverDir = path.join(uploadDir, "covers");
const documentDir = path.join(uploadDir, "documents");

// Ensure upload directories exist
[uploadDir, coverDir, documentDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadDir)); // Serve uploaded files

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, coverDir);
    } else {
      cb(null, documentDir);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload route for cover images and book documents
app.post("/upload", upload.fields([{ name: "bookLink" }, { name: "bookDocument" }]), (req, res) => {
  if (!req.files) return res.status(400).json({ error: "No files uploaded" });

  const bookLink = req.files.bookLink ? `/uploads/covers/${req.files.bookLink[0].filename}` : null;
  const bookDocument = req.files.bookDocument ? `/uploads/documents/${req.files.bookDocument[0].filename}` : null;

  res.json({ bookLink, bookDocument });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
