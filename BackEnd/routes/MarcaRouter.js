import express from 'express';
import { newMarca, listMarcas, getMarcaById, deleteMarcaById, updateMarcaById, getMarcaByNombre } from '../controllers/MarcaController.js';
const router = express.Router();

router.get('/', listMarcas);
router.get('/:id', getMarcaById);
router.get('/nombre/:nombre', getMarcaByNombre);
router.post('/', newMarca);
router.delete('/:id', deleteMarcaById );
router.put('/:id', updateMarcaById);

export default router;