import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const protegidoCobrador = async (req, res, next) => {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res
      .status(400)
      .json({ message: "Faltan datos requeridos protegido COBRADOR " });
  }

  try {
    const usuario = await prisma.usuarios.findFirst({
      where: {
        nombre: nombre,
        password: password,
      },
      select: { role: true },
    });

    if (usuario.nombre === nombre || usuario.password === password) {
      return res
        .status(403)
        .json({
          error: "Credenciales incorrectas o usuario no encontrado protegido COBRADOR.",
        });
    }

    if (usuario.role === "COBRADOR") {
      return next();
    }

    return res
      .status(403)
      .json({ error: "No autorizado. Se requiere el rol COBRADOR. protegido" });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "El nombre o password son incorrectos en el server protegido COBRADOR",
      });
  }
};


export const protegidoSuper =  (rolesPermitidos) => {

  return async (req, res, next) => {
    try {
      const {nombre , password} = req.body // Asumiendo que userId se establece en un middleware previo, como al verificar el token

      // Consulta a la base de datos para obtener el rol del usuario
      const usuario = await prisma.usuarios.findFirst({
        where: { nombre , password },
        select: { role: true }, // Asegúrate de que 'role' es el campo correcto
      });

      if (!usuario || !password || !rolesPermitidos.includes(usuario.role)) {
        return res.status(403).json({ mensaje: 'Acceso denegado.' });
      }

      next();
    } catch (error) {
      console.error("Error en protegerRutas:", error);
      return res.status(500).json({ mensaje: 'Error del servidor.' });
    }
  };

  // const { nombre, password } = req.body;

  // if (!nombre || !password) {
  //   return res
  //     .status(400)
  //     .json({ message: "Faltan datos requeridos protegido Super " });
  // }

  // try {
  //   const usuario = await prisma.usuarios.findFirst({
  //     where: {
  //       nombre: nombre,
  //       password: password,
  //     },
  //     selec: { role: true },
  //   });

  //   if (usuario.nombre === nombre || usuario.password === password) {
  //     return res
  //       .status(403)
  //       .json({
  //         error: "Credenciales incorrectas o usuario no encontrado protegido  Super.",
  //       });
  //   }

  //   if (usuario.role === "SUPER" && usuario.role === "ADMIN" && usuario.role === "COBRADOR") {
  //     return next();
  //   }

  //   return res
  //     .status(403)
  //     .json({ error: "No autorizado. Se requiere el rol SUPER protegido Super" });
  // } catch (error) {
  //   return res
  //     .status(500)
  //     .json({
  //       error: "El nombre o password son incorrectos en el server protegido Super",
  //     });
  // }
};



export const protegidoAdmin = async (req, res, next) => {
  const { nombre, password } = req.body;

  if (!nombre || !password) {
    return res
      .status(400)
      .json({ message: "Faltan datos requeridos protegido Admin" });
  }

  try {
    const usuario = await prisma.usuarios.findFirst({
      where: {
        nombre: nombre,
        password: password,
      },
      select: { role: true },
    });

    if (usuario.nombre === nombre || usuario.password === password) {
      return res
        .status(403)
        .json({
          error: "Credenciales incorrectas o usuario no encontrado protegido Admin.",
        });
    }

    if (usuario.role === "ADMIN") {
      return next();
    }

    return res
      .status(403)
      .json({ error: "No autorizado. Se requiere el rol ADMIN. protegido" });
  } catch (error) {
    return res
      .status(500)
      .json({
        error: "El nombre o password son incorrectos en el server protegido Admin",
      });
  }
};



// Función genérica para proteger rutas según roles permitidos
export const protegerRutaPorRol = (rolesPermitidos) => {
  return async (req, res, next) => {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
      return res
        .status(400)
        .json({ message: "Faltan datos requeridos." });
    }

    try {
      // Consulta en la base de datos para obtener el rol del usuario
      const usuario = await prisma.usuarios.findFirst({
        where: { nombre, password },
        select: { role: true },
      });

      if (!usuario) {
        return res
          .status(403)
          .json({ error: "Credenciales incorrectas o usuario no encontrado." });
      }

      // Verifica si el rol del usuario está dentro de los roles permitidos
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

// Middlewares específicos para cada rol
export const protegidoCobradores = protegerRutaPorRol(["COBRADOR"]);
export const protegidoSuperes = protegerRutaPorRol(["SUPER","ADMIN","COBRADOR"]);
export const protegidoAdmines = protegerRutaPorRol(["ADMIN"]);
