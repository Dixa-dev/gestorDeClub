
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const crearFecha = async (req, res) => {
  try {
    const { titulo } = req.body;

    if (!titulo ) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const eventoPartido = await prisma.eventos.create({
      data: {
        titulo: titulo,
        
      },
    });

    return res.json(eventoPartido);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const obtenerFechaId = async (req, res) => {
  try {
    const { id } = req.params;

    const fecha = await prisma.eventos.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        gastos: true,
        recaudacion: true,
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

export const obtenerTodos = async (req, res) => {

  try {
    const eventos = await prisma.eventos.findMany({
      include: {
        gastos: true,
      },
    })
    if (!eventos) {
      return res.status(404).json({ message: "No hay fechas registradas" });
    }
    res.json(eventos)
  } catch (error) {
    res.status(404).json({ error: error });
  }
}


const evento = await prisma.eventos.findUnique({
  where: {
    id: 4, 
  },
  include: {
    gastos: true, 
  },
});


// const recaudacionTotal = evento.recaudacionEntradas + evento.recaudacionEstacionamiento;


//  const totalGastos = evento.gastos.reduce((acc, gasto) => acc + gasto.monto, 0);

//  const resultadoFinal = recaudacionTotal - totalGastos;

//  console.log('El resultado final es:', resultadoFinal,'de la recaudacion ',evento.titulo);

