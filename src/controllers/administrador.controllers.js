import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const crearFecha = async (req, res) => {
  try {
    const { titulo, recaudacionEntradas, recaudacionEstacionamiento } = req.body;

    if (!titulo || !recaudacionEntradas || !recaudacionEstacionamiento) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const admiPartido = await prisma.administracion.create({
      data: {
        titulo: titulo,
        recaudacionEntradas,
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
    const administracion = await prisma.administracion.findMany({
      include: {
        gastos: true,
      },
    })
    if (!administracion) {
      return res.status(404).json({ message: "No hay fechas registradas" });
    }
    res.json(administracion)
  } catch (error) {
    res.status(404).json({ error: error });
  }
}


const administracion = await prisma.administracion.findUnique({
  where: {
    id: 4, 
  },
  include: {
    gastos: true, 
  },
});


const recaudacionTotal = administracion.recaudacionEntradas + administracion.recaudacionEstacionamiento;


 const totalGastos = administracion.gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

 const resultadoFinal = recaudacionTotal - totalGastos;

 console.log('El resultado final es:', resultadoFinal,'de la recaudacion ',administracion.titulo);

