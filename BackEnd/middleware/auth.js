// middleware/auth.js
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const SECRET = process.env.SECRETKEY;

function validarToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).json({ msg: "Falta el token" });

    const parts = String(authHeader).split(" ");
    if (parts[0] !== "Bearer" || parts.length !== 2)
      return res.status(401).json({ msg: "Formato de token inválido" });

    const token = parts[1];

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error validarToken:", err);
    return res.status(403).json({ msg: "Token inválido o expirado" });
  }
}

// Export por default
export default validarToken;

// Export nombrado
export { validarToken };
