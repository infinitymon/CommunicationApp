import express from 'express';
import ExcelJS from 'exceljs';
import AdminController from '../controllers/AdminController.js';
import upload from "../middleware/multerMiddleware.js";


const router = express.Router();
let admin = new AdminController()

router.post('/', upload.single('file'), admin.upload);

export default router;