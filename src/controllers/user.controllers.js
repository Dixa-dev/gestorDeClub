import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {}
  return res.status(200);
};

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
};

export const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
      return res.status(400).json({ message: "Faltan datos requeridos login" });
    }

    const usuario = await prisma.usuarios.findFirst({
      where: {
        nombre: nombre,
      },
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado login" });
    }

    if (usuario.nombre === nombre && usuario.password === password) {
      return res.status(200).json({ message: "login success", usuario });
    } else {
      return res
        .status(401)
        .json({ message: "Credenciales incorrectas login" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor login" });
  }
};
