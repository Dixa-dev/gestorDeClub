import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {
  return res.status(200);
}
}
;

export const obtenerUsuariosId = async (req, res) => {
  const { id } = req.params;

  const usuario = await prisma.usuarios.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!usuario) {
    return res.status(404).json({ message: "usuario no encontrado " });
  }

  res.json(usuario);
}



export const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
      return res.status(400).json({ message: "Faltan datos requeridos login" });
    }

    const usuario = await prisma.usuarios.findFirst({
      where: {
        nombre: nombre,
        password: password
      },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado login" });
    }


 

      const token = jwt.sign(
        {
          nombre: usuario.nombre,
          password: usuario.password,
          role: usuario.role,
        },
        "12345",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        message: "login success",
        token,
      })
    
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor login" });
  }
}
