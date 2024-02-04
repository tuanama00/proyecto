import express from "express";
import {getMethod,
    getMethodByID,
    postMethod,
    putMethod,
    deleteMethod} from "../../controllers/categorias/categorias.controller";


const router = express.Router();

router.get('/', getMethod); //obtiene todas las categorias
router.get('/:id', getMethodByID); //obtiene una categoria por id
router.post('/', postMethod);//crea una categoria
router.put('/:id', putMethod);//actualiza una categoria
router.delete('/:id', deleteMethod);//elimina una categoria


export default router;
