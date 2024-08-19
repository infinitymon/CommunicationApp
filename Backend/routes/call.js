import express from 'express';
import CallController from '../controllers/CallController.js';


const router = express.Router();
let call = new CallController()

router.get('/', call.index);

router.put('/resolution', call.resolution);
router.put('/followUp', call.followUp);
router.put('/recUpload', call.recUpload);

export default router;