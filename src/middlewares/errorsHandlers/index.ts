import {Request, Response, NextFunction} from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = `Metodo ${req.method} no habilitado en ${req.originalUrl} `
    return res.status(400).json({error: error})
}

export {
    notFoundHandler
}