import express  from "express";
import { getMethod,
    getMethodByID,
    postMethod,
    putMethodById,
    deleteMethodById } from "../../controllers/productos/productos.controller";


const router = express.Router();


//api/productos
router.get('/',getMethod); //obtiene todas las categorias
router.get('/:id', getMethodByID); //obtiene una categoria por id
router.post('/'), postMethod;//crea una categoria
router.put('/:id', putMethodById);//actualiza una categoria
router.delete('/:id', deleteMethodById);//elimina una categoria



export default router;
