import express from 'express';
import CallController from '../controllers/CallController.js';


const router = express.Router();
let call = new CallController()

router.get('/', call.index);

export default router;