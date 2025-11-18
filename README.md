# Proyecto FullStack MERN - Parcial 2 Aplicaciones Híbridas

## Descripción General
Este proyecto es una aplicación FullStack desarrollada con el stack MERN (MongoDB, Express, React, Node.js). Permite la gestión de usuarios, productos, marcas y posts, con autenticación JWT y validaciones tanto en frontend como en backend.

---

## Estructura del Proyecto

```
BackEnd/           # API REST (Node.js, Express, MongoDB)
FrontEnd/          # Aplicación web (React.js, Vite)
```

---

## BackEnd (API REST)

- **Tecnologías:** Node.js, Express, MongoDB, Mongoose
- **Autenticación:** JWT (JSON Web Token)
- **Contraseñas:** Encriptadas con bcryptjs
- **Validaciones:** express-validator
- **Estructura:** Separación en controladores, modelos, rutas y middlewares
- **CRUD:** Usuarios, Productos, Marcas, Posts
- **Paginación y Filtros:** En listados de productos y marcas
- **Manejo de errores:** Middleware global consistente

### Variables de entorno
Crea un archivo `.env` en la carpeta `BackEnd` basado en `.env.example`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/tu_basededatos
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=7d
```
esto esta echo así para que este se guarde en la repo y cuando la descargues, solo tengas que cambiar el url de mongo.

### Instalación y ejecución

```bash
cd BackEnd
npm install
npm start
```

La API estará disponible en `http://localhost:3000`.

### Endpoints principales
- `/api/usuarios` (registro, login, CRUD usuarios)
- `/api/productos` (CRUD productos, paginación y filtro por nombre)
- `/api/marcas` (CRUD marcas, paginación y filtro por nombre)
- `/api/posts` (CRUD posts)

> Las rutas de modificación requieren autenticación JWT.

---

## FrontEnd (React.js)

- **Tecnologías:** React.js, Vite
- **Componentes:** Funcionales y con hooks
- **Gestión de estado:** Context API, useState, useEffect
- **Enrutamiento:** React Router
- **Validaciones:** Formularios con validación
- **Consumo de API:** Separación de lógica de vistas

### Instalación y ejecución

```bash
cd FrontEnd
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## Requisitos cumplidos
- Separación de frontend y backend
- Autenticación JWT
- CRUD completo para usuarios y al menos dos entidades
- Validación de datos en ambos lados
- Encriptación de contraseñas
- Consumo de API desde el frontend
- Documentación y variables de entorno

---

## Cómo probar
1. Clona el repositorio y crea los archivos `.env` según el ejemplo.
2. Instala dependencias y ejecuta backend y frontend.
3. Regístrate y logueate desde el frontend.
4. Prueba las operaciones CRUD y la protección de rutas.

---

## Autor
- Barrientos - Giacomini - Alvarez