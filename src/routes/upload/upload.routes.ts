import express from "express";
import {uploadMethod} from "../../controllers/upload/upload.controller";
import {uploadMiddleware} from "../../middlewares/upload";



const router = express.Router();

router.post('/', uploadMiddleware, uploadMethod);



export default router;
