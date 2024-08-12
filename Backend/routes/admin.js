import express from 'express';
import multer from 'multer';
import ExcelJS from 'exceljs';

const router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists or handle the creation
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res, next) => {
  const file = req.file;

  console.log(req.body, "This is file" , req.file);
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileExtension = path.extname(file.originalname);
  if (fileExtension !== '.xlsx') {
    return res.status(400).send('Invalid file type. Please upload an .xlsx file.');
  }

  const filePath = file.path;
  console.log(fileExtension, filePath, file.originalname);
  res.status(200).json({ message: 'File uploaded successfully!', file: file.originalname });
});

export default router;