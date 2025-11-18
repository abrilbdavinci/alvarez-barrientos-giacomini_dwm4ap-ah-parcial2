import express from 'express';
import { newMarca, listMarcas, getMarcaById, deleteMarcaById, updateMarcaById, getMarcaByNombre } from '../controllers/MarcaController.js';
<<<<<<< HEAD
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
=======
const router = express.Router();

router.get('/', listMarcas);
router.get('/:id', getMarcaById);
router.get('/nombre/:nombre', getMarcaByNombre);
router.post('/', newMarca);
router.delete('/:id', deleteMarcaById );
router.put('/:id', updateMarcaById);
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

export default router;