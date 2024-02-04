import express  from "express";
import categoriasRoutes from "./categorias/categorias.routes";
import clientesRoutes from "./clientes/clientes.routes";
import pedidosRoutes from "./pedidos/pedidos.routes";
import usuariosRoutes from "./usuarios/usuarios.routes";
import productosRoutes from "./productos/productos.routes";



const router = express.Router();

router.use('/categorias', categoriasRoutes);
router.use('/clientes', clientesRoutes);
router.use('/pedidos', pedidosRoutes);
router.use('/usuarios', usuariosRoutes);
router.use('/productos', productosRoutes);//jjj


export default router;
