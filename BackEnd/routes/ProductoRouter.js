import express from 'express';
import { newProducto, listProductos, getProductoById, deleteProductoById, updateProductoById, getProductoByNombre } from '../controllers/ProductoController.js';
<<<<<<< HEAD
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
=======
const router = express.Router();

router.get('/', listProductos);
router.get('/:id', getProductoById);
router.get('/nombre/:nombre', getProductoByNombre);
router.post('/', newProducto);
router.delete('/:id', deleteProductoById );
router.put('/:id', updateProductoById);
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

export default router;