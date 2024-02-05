import {PrismaClient} from '@prisma/client';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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
        // Cifrar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(body.clave, 10);

        const result = await prisma.usuarios.create({
            data: {
                ...body,
                clave: hashedPassword,
            },
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
const loginMethod = async (req: Request, res: Response) => {
    try {
        const {body} = req;

        const valido = ["correo", "clave"];
        const invalido = Object.keys(body).filter(campo => !valido.includes(campo));

        if (invalido.length > 0) {
            return res.status(400).json({message: 'Datos inválidos', invalido});
        }
        const correoExistente = await prisma.usuarios.findUnique({
            where: {correo: body.correo},
        });
        const payload = {
            id: correoExistente?.id,
            nombres: correoExistente?.nombres,
            apellidos: correoExistente?.apellidos,
            correo: correoExistente?.correo,
            role: correoExistente?.role
        };
        console.log(process.env.SECRET_KEY);

        if (correoExistente) {
            const match = await bcrypt.compare(body.clave, correoExistente.clave);
            if (match) {
                const token = jwt.sign({payload}, process.env.SECRET_KEY!, {
                    expiresIn: '24h'
                });
                console.log(process.env.SECRET_KEY);
                return res.status(200).json({message: "Usuario Autenticado", jwt: token, userData: payload});
            }
            return res.status(401).json({message: 'Credenciales incorrecta'});
        }
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
    deleteMethod,
    loginMethod
}