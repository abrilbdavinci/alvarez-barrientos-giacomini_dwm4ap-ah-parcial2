// routes/UsuarioRouter.js
import express from 'express';
<<<<<<< HEAD

=======
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
import {
  newUser,
  listUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByNombre,
<<<<<<< HEAD
  loginUser
} from '../controllers/UsuarioController.js';
import validarToken from '../middleware/auth.js';
import { body } from 'express-validator';
=======
  loginUser   // <-- asegurate de exportarlo desde el controller
} from '../controllers/UsuarioController.js';
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

const router = express.Router();

/* Rutas públicas */
<<<<<<< HEAD

// Rutas públicas
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  loginUser
);
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  newUser
);

// Rutas protegidas (requieren JWT)
router.get('/', validarToken, listUsers);
router.get('/nombre/:nombre', validarToken, getUserByNombre);
router.get('/:id', validarToken, getUserById);
router.put('/:id', validarToken, updateUserById);
router.delete('/:id', validarToken, deleteUserById);
=======
router.post('/login', loginUser);   // LOGIN -> POST /api/usuarios/login
router.post('/', newUser);
router.get('/', listUsers);

/* Rutas parametrizadas */
router.get('/nombre/:nombre', getUserByNombre); // rutas estáticas/longform antes que ':id' si hay riesgo
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

export default router;
