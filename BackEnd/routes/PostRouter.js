// BackEnd/routes/PostRouter.js
import express from "express";
// intentamos importar de varias formas para ser tolerantes a la forma de export en auth.js
import validarTokenDefault, * as authAll from "../middleware/auth.js";
import Post from "../models/Post.js"; // Asegurate que el modelo exista

const router = express.Router();

// resolver cuál es el middleware válido disponible
// prioridad: named authMiddleware -> named validarToken -> default import
const authMiddleware =
  authAll.authMiddleware || authAll.validarToken || validarTokenDefault;

// Helper: si no existe, lanzamos error claro al usarlo
if (!authMiddleware) {
  // No terminamos el proceso aquí para que nodemon muestre el archivo exacto
  console.error(
    "⚠️ auth middleware no encontrado. Verifica exports en middleware/auth.js (debe exportar authMiddleware o validarToken o default)."
  );
}

/* ===============================
   GET TODOS LOS POSTS
   GET /api/posts
================================ */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error GET /api/posts:", error);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
});

/* ===============================
   GET UN POST POR ID
   GET /api/posts/:id
================================ */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.json(post);
  } catch (error) {
    console.error("Error GET /api/posts/:id", error);
    res.status(500).json({ error: "Error al obtener el post" });
  }
});

/* ===============================
   CREAR UN POST NUEVO (protegido)
   POST /api/posts
================================ */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { titulo, contenido, categoria } = req.body;
    if (!titulo || !contenido) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevoPost = new Post({
      titulo,
      contenido,
      categoria: categoria || "general",
      autor: req.user?.userId || req.user?.id || req.user?.userId || null,
    });

    const guardado = await nuevoPost.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error("Error POST /api/posts:", error);
    res.status(500).json({ error: "Error al crear el post" });
  }
});

/* ===============================
   EDITAR POST (protegido)
   PUT /api/posts/:id
================================ */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    // comprobar propietario si req.user trae userId
    const userId = req.user?.userId || req.user?.id || req.user?._id;
    if (post.autor && userId && post.autor.toString() !== userId.toString()) {
      return res.status(403).json({ error: "No tienes permiso para editar" });
    }

    const actualizado = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(actualizado);
  } catch (error) {
    console.error("Error PUT /api/posts/:id", error);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
});

/* ===============================
   ELIMINAR POST (protegido)
   DELETE /api/posts/:id
================================ */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post no encontrado" });

    const userId = req.user?.userId || req.user?.id || req.user?._id;
    if (post.autor && userId && post.autor.toString() !== userId.toString()) {
      return res.status(403).json({ error: "No tienes permiso para eliminar" });
    }

    await post.deleteOne();
    res.json({ message: "Post eliminado" });
  } catch (error) {
    console.error("Error DELETE /api/posts/:id", error);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
});

export default router;
