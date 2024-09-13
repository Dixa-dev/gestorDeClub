import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearCuota = async (req, res) => {
  const { anio, mes, monto, fechaPago, comprobantePago, jugadorId } = req.body;

  try {
    if (
      !anio ||
      !mes ||
      !monto ||
      !fechaPago ||
      !comprobantePago ||
      !jugadorId
    ) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const cuotaExistente = await prisma.cuotas.findFirst({
      where: {
        jugadorId: jugadorId,
        mes: mes
      },
    });

    // Si existe una cuota en ese mes y año para ese jugador, no permitir crear otra
    if (cuotaExistente) {
      return res.status(400).json({
        message: "Ya existe una cuota registrada para este jugador en el mismo mes o año.",
      });
    }

    
  
    const cuotaCreada = await prisma.cuotas.create({
      data: {
        anio,
        mes,
        monto,
        fechaPago,
        comprobantePago,
        jugador: { connect: { id: jugadorId } },
      },
    });

    res.status(201).json(cuotaCreada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerCuotas = async (req, res) => {
  try {
    const cuotas = await prisma.cuotas.findMany({
      include: {
        jugador: true,
      },
    });
    res.status(200).json(cuotas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const obtenerCuotaPorId = async (req, res) => {
  const { id } = req.params;
  const cuotas = await prisma.cuotas.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      jugador: true,
    },
  });
  if (!cuotas) {
    return res.status(404).json({ message: "Cuota no encontrada" });
  }
  res.status(200).json(cuotas);
};
