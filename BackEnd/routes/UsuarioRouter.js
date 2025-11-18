// routes/UsuarioRouter.js
import express from 'express';

import {
  newUser,
  listUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByNombre,
  loginUser
} from '../controllers/UsuarioController.js';
import validarToken from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

/* Rutas públicas */

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

export default router;
