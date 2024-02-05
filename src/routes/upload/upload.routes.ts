import express from "express";
import {uploadMethod, deleteMethod} from "../../controllers/upload/upload.controller";
import {uploadMiddleware} from "../../middlewares/upload";



const router = express.Router();

router.post('/', uploadMiddleware, uploadMethod);
router.delete('/:id', uploadMiddleware, deleteMethod);




export default router;
