import express  from "express";
import { getMethod,
    getMethodByID,
    postMethod,
    putMethodById,
    deleteMethodById } from "../../controllers/clientes/clientes.controller";


const router = express.Router();

//api/clientes
router.get('/', getMethod);
router.get('/:id',getMethodByID);
router.post('/', postMethod);
router.put('/:id',putMethodById);
router.delete('/:id',deleteMethodById);



export default router;
