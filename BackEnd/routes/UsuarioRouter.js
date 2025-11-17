// routes/UsuarioRouter.js
import express from 'express';
import {
  newUser,
  listUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByNombre,
  loginUser   // <-- asegurate de exportarlo desde el controller
} from '../controllers/UsuarioController.js';

const router = express.Router();

/* Rutas públicas */
router.post('/login', loginUser);   // LOGIN -> POST /api/usuarios/login
router.post('/', newUser);
router.get('/', listUsers);

/* Rutas parametrizadas */
router.get('/nombre/:nombre', getUserByNombre); // rutas estáticas/longform antes que ':id' si hay riesgo
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;
