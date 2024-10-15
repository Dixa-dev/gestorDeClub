import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearRecaudacion = async (req, res) => {
  try {
    const { reciboInicial, reciboFinal, nombre, eventoId,monto } = req.body;

    const recaudacionEvento = await prisma.recaudacion.create({
      data: {
        reciboInicial,
        reciboFinal,
        nombre,
        monto,
        eventoId,
      },
    });
    res.status(200).json(recaudacionEvento);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const obtenerRecaudacion = async (req, res) => {
  try {
    const recaudaciones = await prisma.recaudacion.findMany();

    res.json(recaudaciones);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
