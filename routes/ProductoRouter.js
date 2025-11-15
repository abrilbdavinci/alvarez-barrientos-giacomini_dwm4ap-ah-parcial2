import express from 'express';
import { newProducto, listProductos, getProductoById, deleteProductoById, updateProductoById, getProductoByNombre } from '../controllers/ProductoController.js';
const router = express.Router();

router.get('/', listProductos);
router.get('/:id', getProductoById);
router.get('/nombre/:nombre', getProductoByNombre);
router.post('/', newProducto);
router.delete('/:id', deleteProductoById );
router.put('/:id', updateProductoById);

export default router;