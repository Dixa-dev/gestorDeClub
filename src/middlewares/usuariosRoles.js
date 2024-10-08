import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();





export const protegerRutaPorRol = (rolesPermitidos) => {
  return async (req, res, next) => {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
      return res
        .status(400)
        .json({ message: "Faltan datos requeridos." });
    }

    try {
     
      const usuario = await prisma.usuarios.findFirst({
        where: { nombre, password },
        select: { role: true },
      });

      if (!usuario) {
        return res
          .status(403)
          .json({ error: "Credenciales incorrectas o usuario no encontrado." });
      }

    
      if (rolesPermitidos.includes(usuario.role)) {
        return next();
      }

      return res
        .status(403)
        .json({ error: "No autorizado. Se requiere un rol adecuado." });
    } catch (error) {
      console.error("Error en protegerRutaPorRol:", error);
      return res
        .status(500)
        .json({ error: "Error del servidor." });
    }
  };
};



export const protegidoCobradores = protegerRutaPorRol(["COBRADOR"]);
export const protegidoSuperes = protegerRutaPorRol(["SUPER","ADMIN","COBRADOR"]);
export const protegidoAdmin = protegerRutaPorRol(["ADMIN"]);
