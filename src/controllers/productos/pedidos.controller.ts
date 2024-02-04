import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {
    try{
        const result = await prisma.pedidos.findMany();
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::pedidos",e);
        return res.status(500).json(e);
    }
}

const getMethodByID = async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const result = await prisma.pedidos.findUnique({where: {id: parseInt(id)}});
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::pedidos",e);
        return res.status(500).json(e);
    }
}
const postMethod = async (req: Request, res: Response) => {
    try{
        const {body} = req;
        const result = await prisma.pedidos.create({
            data: body
        });
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::pedidos",e);
        return res.status(500).json(e);
    }
}
const putMethodById = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;
    try{
        const result = await prisma.pedidos.update({
            where: {id: parseInt(id)},
            data: body
        })
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::pedidos",e);
        return res.status(500).json(e);
    }
}
const deleteMethodById = async (req: Request, res: Response) => {
    const {id} = req.params;
    try{
        const result = await prisma.pedidos.delete({
            where: {id: parseInt(id)}
        });
        res.status(200).json(result);
    }catch(e){
        console.log("error:controller::pedidos",e);
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