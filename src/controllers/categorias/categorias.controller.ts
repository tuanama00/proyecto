import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {
try {
        const result = await prisma.categorias.findMany();
        res.status(200).json(result);
     } catch (e) {
         console.log("error:controller::categorias", e);
         return res.status(500).json(e);
}
}

const getMethodByID = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result = await prisma.categorias.findUnique({where: {id: parseInt(id)}});
        if(result){
            return res.status(200).json(result);
        }
        return res.status(404).json({message: 'La categoria buscada no existe'})

    } catch(e) {
        console.log("error:controller::categorias", e);
        return res.status(500).json(e);
    }
}
const postMethod = async (req: Request, res: Response) => {
    try {
        const {body} = req;

        const valido = ['nombre'];
        const invalido = Object.keys(body).filter(campo => !valido.includes(campo));

        if (invalido.length > 0) {
            return res.status(400).json({message: 'Datos inválidos', invalido});
        }

        const result = await prisma.categorias.create({
            data: body
        });
        res.status(200).json(result);
    } catch(e) {
        console.log("error:controller::categorias", e);
        return res.status(500).json(e);
    }
}
const putMethod = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;
    try {

        const exist = await prisma.categorias.findUnique({where: {id: parseInt(id)}});

        if (exist) {
            const result = await prisma.categorias.update({
                where: {id: parseInt(id)},
                data: body
            })
            return res.status(200).json(result);

        }
        return res.status(404).json({message: 'La categoria buscada no existe'});
    } catch(e) {
        console.log("error:controller::categorias",e);
        return res.status(500).json(e);


    }
}

const deleteMethod = async (req: Request, res: Response) => {
    const {id} = req.params;


    try{
        const exist = await prisma.categorias.findUnique({where: {id: parseInt(id)}});

        if (exist) {
            const result = await prisma.categorias.delete({
                where: {id: parseInt(id)}
            });
            return res.status(200).json( { message: 'La categoría fue eliminada', result});


        }
        return res.status(404).json({message: 'La categoria buscada no existe'});

    } catch (e) {
        console.log("error:controller::categorias", e);
        return res.status(500).json(e);
    }
}

export {
    getMethod,
    getMethodByID,
    postMethod,
    putMethod,
    deleteMethod
}