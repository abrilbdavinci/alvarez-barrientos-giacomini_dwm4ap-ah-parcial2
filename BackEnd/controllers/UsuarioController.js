// controllers/UsuarioController.js
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import bcrypt from 'bcryptjs';
=======
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
import User from '../models/UsuarioModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret-demo';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Crear nuevo usuario (contraseña en texto plano)
 * POST /api/usuarios
 */
<<<<<<< HEAD
import { validationResult } from 'express-validator';

const newUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nombre, email, password } = req.body;
=======
const newUser = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email y password requeridos' });
    }
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

    // Evitar duplicados
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ msg: 'El email ya está registrado' });
    }

<<<<<<< HEAD
    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = new User({
      nombre: nombre || '',
      email: email.toLowerCase().trim(),
      password: hashedPassword,
=======
    const usuario = new User({
      nombre: nombre || '',
      email: email.toLowerCase().trim(),
      password, // texto plano
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
    });

    const data = await usuario.save();

    // No devolver password en la respuesta
    const { password: _p, ...safe } = data.toObject();
    return res.status(201).json({ msg: 'Usuario creado', data: safe });
  } catch (err) {
    next(err);
  }
};

/**
 * Login de usuario (contraseña en texto plano)
 * POST /api/usuarios/login
 */
const loginUser = async (req, res, next) => {
  try {
<<<<<<< HEAD
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('[LOGIN] body:', req.body);
    const { email, password } = req.body;
=======
    console.log('[LOGIN] body:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email y password requeridos' });
    }
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      console.log('[LOGIN] usuario no encontrado:', email);
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

<<<<<<< HEAD
    // Comparar contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
=======
    // Comparar texto plano
    if (user.password !== password) {
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
      console.log('[LOGIN] password incorrecta para:', email);
      return res.status(401).json({ msg: 'Credenciales inválidas' });
    }

    // Generar token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const userSafe = {
      id: user._id,
      email: user.email,
      nombre: user.nombre || null,
    };

    return res.status(200).json({ msg: 'Login ok', token, user: userSafe });
  } catch (err) {
    next(err);
  }
};

/**
 * Listar todos los usuarios
 * GET /api/usuarios
 */
const listUsers = async (req, res, next) => {
  try {
    const usuarios = await User.find().select('-password');
    return res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

/**
 * Obtener usuario por ID
 * GET /api/usuarios/:id
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) return res.status(200).json({ data: user });
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  } catch (err) {
    next(err);
  }
};

/**
 * Eliminar usuario por ID
 * DELETE /api/usuarios/:id
 */
const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) return res.status(200).json({ msg: 'Usuario eliminado' });
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  } catch (err) {
    next(err);
  }
};

/**
 * Actualizar usuario por ID (sin hash)
 * PUT /api/usuarios/:id
 */
const updateUserById = async (req, res, next) => {
  try {
    const body = { ...req.body };
    const user = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (user) return res.status(200).json({ msg: 'Usuario actualizado', data: user });
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  } catch (err) {
    next(err);
  }
};

/**
 * Buscar usuario(s) por nombre (case-insensitive)
 * GET /api/usuarios/nombre/:nombre
 */
const getUserByNombre = async (req, res, next) => {
  try {
    const nombre = (req.params.nombre || '').trim();
    if (!nombre) return res.status(400).json({ msg: 'Nombre requerido' });

    const usuarios = await User.find({
      nombre: { $regex: `^${nombre}$`, $options: 'i' },
    }).select('-password');

    if (usuarios.length > 0) return res.status(200).json({ data: usuarios });
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  } catch (err) {
    next(err);
  }
};

// Exportar solo named exports, sin duplicados
export {
  newUser,
  loginUser,
  listUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByNombre,
};
