import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';

const prisma = new PrismaClient();

const getMethod = async (req: Request, res: Response) => {
    try {
        const result = await prisma.usuarios.findMany();
        res.status(200).json(result);
    } catch (e) {
        console.log("error:controller::usuarios", e);
        return res.status(500).json(e);
    }
};

const getMethodByID = async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result = await prisma.usuarios.findUnique({where: {id: parseInt(id)}});
        if (result) {
            return res.status(200).json(result);
        }
        return res.status(404).json({message: 'La categoria buscada no existe'})

    } catch (e) {
        console.log("error:controller::usuarios", e);
        return res.status(500).json(e);
    }
};
const postMethod = async (req: Request, res: Response) => {
    try {
        const {body} = req;

        const valido = ['nombres', "apellidos", "correo", "clave", "role"];
        const invalido = Object.keys(body).filter(campo => !valido.includes(campo));

        if (invalido.length > 0) {
            return res.status(400).json({message: 'Datos inválidos', invalido});
        }
        const correoExistente = await prisma.usuarios.findUnique({
            where: {correo: body.correo},
        });

        if (correoExistente) {
            return res.status(400).json({message: 'Correo utilizado. Elija otro correo.'});
        }

        const result = await prisma.usuarios.create({
            data: body
        });

        const respuesta = {...result, message: 'Usuario creado satisfactoriamente'};
        res.status(200).json(respuesta);

    } catch (e) {
        console.log("error:controller::usuarios", e);
        return res.status(500).json(e);
    }
};
const putMethod = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;
    try {

        const exist = await prisma.usuarios.findUnique({where: {id: parseInt(id)}});

        if (exist) {
            const correoExistente = await prisma.usuarios.findUnique({
                where: {correo: body.correo},
            });

            if (correoExistente) {
                return res.status(400).json({message: 'Correo utilizado. Elija otro correo.'});
            }

            const result = await prisma.usuarios.update({
                where: {id: parseInt(id)},
                data: body
            });
            return res.status(200).json(result);

        }
        return res.status(404).json({message: 'El usuario fue eliminado'});
    } catch (e) {
        console.log("error:controller::usuarios", e);
        return res.status(500).json(e);
        //console.log(e);

    }
};

const deleteMethod = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {

        const exist = await prisma.usuarios.findUnique({where: {id: parseInt(id)}});

        if (exist) {
            const result = await prisma.usuarios.delete({
                where: {id: parseInt(id)}
            });
            return res.status(200).json({message: 'El usuario fue eliminado', result});


        }
        return res.status(404).json({message: 'El usuario no existe'});

    } catch (e) {
        console.log("error:controller::usuarios", e);
        return res.status(500).json(e);
    }
};

export {
    getMethod,
    getMethodByID,
    postMethod,
    putMethod,
    deleteMethod
}