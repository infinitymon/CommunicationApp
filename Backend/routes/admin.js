import express from 'express';
import AdminController from '../controllers/AdminController.js';
import upload from "../middleware/multerMiddleware.js";


const router = express.Router();
let admin = new AdminController()

router.post('/upload', upload.single('file'), admin.upload);
router.get('/', admin.index)

export default router;