import express from 'express';
import { newMarca, listMarcas, getMarcaById, deleteMarcaById, updateMarcaById, getMarcaByNombre } from '../controllers/MarcaController.js';
import validarToken from '../middleware/auth.js';
const router = express.Router();


// Rutas públicas
router.get('/', listMarcas);
router.get('/:id', getMarcaById);
router.get('/nombre/:nombre', getMarcaByNombre);

// Rutas protegidas
router.post('/', validarToken, newMarca);
router.delete('/:id', validarToken, deleteMarcaById );
router.put('/:id', validarToken, updateMarcaById);

export default router;