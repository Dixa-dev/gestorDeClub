
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const verificarRole = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      const { nombre, password } = req.body;


      const usuario = await prisma.usuarios.findMany({
        where: {
          nombre: nombre,
          password: password
        },
        select: {
          role: true
        }
      });
      console.log(usuario.role);
      

      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if (rolesPermitidos.includes(usuario.role)) {
        console.log(usuario.role);
        
        return next();
      } else {
        return res.status(403).json({ message: "No tiene permiso para acceder a esta ruta" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error del servidor" });
    }
  };
};
