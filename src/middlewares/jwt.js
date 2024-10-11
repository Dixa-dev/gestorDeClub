import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No hay token en la cabecera" });
  }
  token = token.split(" ")[1];

  try {
    const { nombre, password, role } = jwt.verify(token, "12345");
    req.nombre=nombre
    req.password=password
    req.role=role
    next();
  } catch (error) {
    return res.status(401).json({ msg: error, message: "Token inválido" });
  }
};

export const verificarAdmin = async (req, res, next) => {
  try {
    
    if (req.role === "ADMIN") {
      next();
    } else {
      return res.status(403).json({
        message: "No estas autorizado",
      });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }

};

export const verificarSuper = async (req, res, next) => {
  const usuario = await prisma.usuarios.findFirst({
    where: {
      id: req.userId,
    },
    select: { role: true },
  });

  if (
    usuario.role === "COBRADOR" ||
    usuario.role === "ADMIN" ||
    usuario.role === " SUPER"
  ) {
    next();
  } else {
    return res.status(403).json({
      message: "No estas autorizado ",
    });
  }
};

export const verificarCobrador = async (req, res, next) => {
  try {
    // const { password, nombre } = req.body;
    // const usuario = await prisma.usuarios.findFirst({
    //   where: {
    //    password,
    //    nombre,
    //   },
    //   select: { role: true },
    // })
    if (req.role === "COBRADOR") {
      next();
    } else {
      return res.status(403).json({
        message: "No estas autorizado ",
      });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export default verificarToken;
