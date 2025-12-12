import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * Dynamic multer uploader
 * @param {string} folder - folder name inside /uploads
 */
const dynamicUploader = (folder) => {
  // Ensure folder exists
  const uploadPath = `uploads/${folder}`;
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
      );
    },
  });

  return multer({ storage });
};

export default dynamicUploader;
