import express from 'express';
import { newProducto, listProductos, getProductoById, deleteProductoById, updateProductoById, getProductoByNombre } from '../controllers/ProductoController.js';
import validarToken from '../middleware/auth.js';
const router = express.Router();


// Rutas públicas
router.get('/', listProductos);
router.get('/:id', getProductoById);
router.get('/nombre/:nombre', getProductoByNombre);

// Rutas protegidas
router.post('/', validarToken, newProducto);
router.delete('/:id', validarToken, deleteProductoById );
router.put('/:id', validarToken, updateProductoById);

export default router;