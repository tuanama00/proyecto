import multer, {MulterError} from 'multer';
import {Request, Response, NextFunction} from 'express';
import path from 'path';
import { format } from 'date-fns';

const uploadPath = path.join(__dirname, '../../uploads');


const storage = multer.diskStorage({
    destination: function(req: Request, file: Express.Multer.File, cb: Function) {
        cb(null, uploadPath);
    },
    filename: function(req: Request, file: Express.Multer.File, cb: Function) {
        const currentDate = format(new Date(), "ddMMyyyy-HHmmss");
        const fileName = `${currentDate}-${file.originalname.replace(/\s+/g, '_')}`;
        cb(null, fileName);
    }
});


const filter = ( req: Request, file: Express.Multer.File, cb: Function) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.mimetype === 'application/zip' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'||
        file.mimetype === 'application/zip') {
        cb(null, true);
       // console.log(file.mimetype);
    } else {
        cb(new Error('File type not supported'), false);
       // console.log(file.mimetype);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filter
}).single('file');

const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any)=>{
        if(err) return res.status(500).json({error: err.message});
        next();
    })
}

export {
    uploadMiddleware
};


