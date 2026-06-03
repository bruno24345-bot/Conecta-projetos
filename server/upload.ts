import express, { Request, Response } from "express";
import multer from "multer";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";

const router = express.Router();

// Multer: armazena em memória (sem disco) para envio direto ao S3
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB máximo
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg", "image/png", "image/webp", "image/gif",
      "application/pdf",
      "application/octet-stream", // CAD files
      "application/zip",
    ];
    if (allowed.includes(file.mimetype) || file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo não permitido."));
    }
  },
});

router.post("/api/upload", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    const ext = req.file.originalname.split(".").pop() ?? "bin";
    const key = `uploads/${nanoid(12)}.${ext}`;

    const { url } = await storagePut(key, req.file.buffer, req.file.mimetype);

    return res.json({ url, key, name: req.file.originalname, size: req.file.size });
  } catch (error: any) {
    console.error("[Upload] Error:", error);
    return res.status(500).json({ error: error.message ?? "Erro interno no upload." });
  }
});

export { router as uploadRouter };
