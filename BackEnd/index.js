// BackEnd/index.js
import dotenv from "dotenv";
dotenv.config(); // cargar variables de entorno lo antes posible

import express from "express";
import cors from "cors";

import { connectDB } from "./config/dataBase.js"; // debe exportar connectDB()
import usuarioRouter from "./routes/UsuarioRouter.js";
import productoRouter from "./routes/ProductoRouter.js";
import marcaRouter from "./routes/MarcaRouter.js";
import postRouter from "./routes/PostRouter.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

/* -------------------------
   Middlewares globales
app.use(cors()); // en dev permite todo; en prod configurá origenes
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

/* -------------------------
   Ruta raíz simple
   ------------------------- */
app.get("/", (req, res) => {
  res.json({ msg: "API BackEnd - alive" });
});

/* -------------------------
   Iniciar servidor sólo después de conectar DB
   ------------------------- */
let server;

async function startServer() {
  try {
    // Intentamos conectar la base de datos
    await connectDB();
    // Montamos routers después de conectar (opcional pero recomendable)
    app.use("/api/usuarios", usuarioRouter);
    app.use("/api/productos", productoRouter);
    app.use("/api/marcas", marcaRouter);
    app.use("/api/posts", postRouter);

    // Handler simple de errores (middleware con 4 args)
    // Se coloca después de las rutas
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
      console.error("Error handler:", err);
      const status = err.status || 500;
      res.status(status).json({ msg: err.message || "Error interno del servidor" });
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ msg: "Endpoint no encontrado" });
    });

    // Iniciar servidor
    server = app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  } catch (err) {
    console.error("Fallo al conectar a la base de datos (startServer):", err);
    process.exit(1); // salir con error -> nodemon mostrará la falla
  }
}

/* -------------------------
   Manejo de señales y errores globales
   ------------------------- */
// Cerrar el servidor y desconectar la DB de forma ordenada
async function shutdownHandler(signal) {
  console.log(`\nRecibida señal ${signal}. Cerrando servidor...`);
  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
      console.log("Servidor cerrado.");
    }
    // Si usás mongoose, podés desconectarlo aquí:
    try {
      const mongoose = await import("mongoose");
      if (mongoose && mongoose.connection && mongoose.connection.readyState) {
        await mongoose.disconnect();
        console.log("Desconectado de MongoDB.");
      }
    } catch (e) {
      // noop: si no usás mongoose o falla, no detenemos el shutdown
    }
    process.exit(0);
  } catch (err) {
    console.error("Error al cerrar servidor:", err);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdownHandler("SIGINT"));
process.on("SIGTERM", () => shutdownHandler("SIGTERM"));

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
  // opcional: shutdownHandler("unhandledRejection");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  // Es recomendable reiniciar la app en producción.
  // Aquí cerramos ordenadamente
  shutdownHandler("uncaughtException");
});

/* -------------------------
   Start!
   ------------------------- */
startServer();
