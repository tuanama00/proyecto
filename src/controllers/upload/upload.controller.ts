import {Request, Response} from 'express';
import {PrismaClient} from '@prisma/client';


const prisma = new PrismaClient();

const uploadMethod = async (req: Request, res: Response) => {
    try {
        const {file} = req;
        const value = {
            path: file?.path || '',
            filename: file?.filename || '',
            size: file?.size || 0,
            mimetype: file?.mimetype || ''
        };

        const result = await prisma.files.create({
            data: value
        });
        return res.status(200).json({data: file})
    } catch (error) {
        console.log("error::controller::upload", error);
        return res.status(500).json(error);
    }
}




// const putMethodById = async (req: Request, res: Response) => {
//     const {id} = req.params;
//     const {body} = req;
//     try{
//         const result = await prisma.productos.update({
//             where: {id: parseInt(id)},
//             data: body
//         })
//         res.status(200).json(result);
//     }catch(e){
//
//
//
//         console.log("error:controller::productos",e);


export {
    uploadMethod,
}
