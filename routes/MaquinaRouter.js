import express from 'express';
import { newMaquina, listMaquinas, getMaquinaById, deleteMaquinaById, updateMaquinaById, getMaquinaByNombre } from '../controllers/MaquinaController.js';
const router = express.Router();

router.get('/', listMaquinas);
router.get('/:id', getMaquinaById);
router.get('/nombre/:nombre', getMaquinaByNombre);
router.post('/', newMaquina);
router.delete('/:id', deleteMaquinaById );
router.put('/:id', updateMaquinaById);

export default router;