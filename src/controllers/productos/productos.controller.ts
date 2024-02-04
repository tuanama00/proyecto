import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {
    try{
        const result = await prisma.productos.findMany();
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::productos",e);
        return res.status(500).json(e);
    }
}

const getMethodByID = async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const result = await prisma.productos.findUnique({where: {id: parseInt(id)}});
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::productos",e);
        return res.status(500).json(e);
    }
}
const postMethod = async (req: Request, res: Response) => {
    try{
        const {body} = req;
        const result = await prisma.productos.create({
            data: body
        });
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::productos",e);
        return res.status(500).json(e);
    }
}
const putMethodById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;
    try{
        const result = await prisma.productos.update({
            where: {id: parseInt(id)},
            data: body
        })
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::productos",e);
        return res.status(500).json(e);
    }
}
const deleteMethodById = async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const result = await prisma.productos.delete({
            where: {id: parseInt(id)}
        });
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::productos",e);
        return res.status(500).json(e);
    }
}

export {
    getMethod,
    getMethodByID,
    postMethod,
    putMethodById,
    deleteMethodById
}