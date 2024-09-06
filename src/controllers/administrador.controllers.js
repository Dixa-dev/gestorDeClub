import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearFecha = async (req, res) => {
  try {
    const { titulo, recaudacionEntadas, recaudacionEstacionamiento } = req.body;

    if (!titulo || !recaudacionEntadas || !recaudacionEstacionamiento) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const admiPartido = await prisma.administracion.create({
      data: {
        titulo: titulo,
        recaudacionEntadas,
        recaudacionEstacionamiento,
      },
    });

    return res.json(admiPartido);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const obtenerFechaId = async (req, res) => {
  try {
    const { id } = req.params;

    const fecha = await prisma.administracion.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        gastos: true,
      },
    });
    if (!fecha) {
      return res.status(404).json({ message: "Fecha no encontrada" });
    }
    res.json(fecha);
  } catch (error) {
     res.status(404).json({ error: error });
  }
};

export const administraciones = async (req, res) => {

  try {
    const administraciones = await prisma.administracion.findMany({
      include: {
        gastos: true,
      },
    })
    if (!administraciones) {
      return res.status(404).json({ message: "No hay fechas registradas" });
    }
    res.json(administraciones)
  } catch (error) {
    res.status(404).json({ error: error });
  }
}


const administracion = await prisma.administracion.findUnique({
  where: {
    id: 1, // El ID de la administración que quieres consultar
  },
  include: {
    gastos: true, // Incluir todos los gastos relacionados con la administración
  },
});

// Sumar la recaudación de entradas y estacionamiento
const recaudacionTotal = administracion.recaudacionEntadas + administracion.recaudacionEstacionamiento;

// Sumar todos los montos de gastos
const totalGastos = administracion.gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

// Realizar la resta final
const resultadoFinal = recaudacionTotal - totalGastos;

console.log('El resultado final es:', resultadoFinal,'de la recaudacion ',administracion.titulo);
