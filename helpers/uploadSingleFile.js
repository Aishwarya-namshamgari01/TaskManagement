import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
    req.fileName = file.fieldname + "-" + uniqueSuffix + `.${ext}`;
    // req.filePath = `/public/${req.fileName}`
  },
});

const upload = multer({
  storage: storage,
}).single("image");

const uploadSingleFile = (req, res, next) => {
  upload(req, res, async (err) => {
    console.log({ err });
    next();
  });
};
export default uploadSingleFile;
