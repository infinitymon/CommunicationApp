// upload.js
const express = require('express');
// const path = require('path');
const multer = require('multer');
// const ExcelJS = require('exceljs');
const path = require('path');
const ExcelJS = require('exceljs');

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
// const storage = multer.memoryStorage();

// Initialize Multer with the defined storage
const upload = multer({ storage: storage });

// Define the upload route
router.post('/', upload.single('file'), async (req, res, next) => {
  const file = req.file;

  console.log(req.body, "This is file" , req.file);
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  // Verify file extension
  const fileExtension = path.extname(file.originalname);
  if (fileExtension !== '.xlsx') {
    return res.status(400).send('Invalid file type. Please upload an .xlsx file.');
  }

  const filePath = file.path;
  console.log(fileExtension, filePath, file.originalname);

  // Process the file with ExcelJS or any further logic here
  res.status(200).json({ message: 'File uploaded successfully!', file: file.originalname });
});


module.exports = router;