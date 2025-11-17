import express from 'express';
import { newUser, listUsers, getUserById, deleteUserById, updateUserById, getUserByNombre } from '../controllers/UsuarioController.js';
const router = express.Router();

router.get('/', listUsers);
router.get('/:id', getUserById);
router.get('/nombre/:nombre', getUserByNombre);
router.post('/', newUser);
router.delete('/:id', deleteUserById );
router.put('/:id', updateUserById);

export default router;