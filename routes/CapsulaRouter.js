import express from 'express';
import { newCapsula, listCapsulas, getCapsulaById, deleteCapsulaById, updateCapsulaById, getCapsulaByNombre } from '../controllers/CapsulaController.js';
const router = express.Router();

router.get('/', listCapsulas);
router.get('/:id', getCapsulaById);
router.get('/nombre/:nombre', getCapsulaByNombre);
router.post('/', newCapsula);
router.delete('/:id', deleteCapsulaById );
router.put('/:id', updateCapsulaById);

export default router;