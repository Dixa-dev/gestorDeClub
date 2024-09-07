import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const tortaJugadoresCuotas = async (req, res) => {
  try {
    const jugadoresQuePagaronEnMes = await prisma.cuotas.count({
      where: {
        mes: "Enero",
      },
    });

    return res.json(jugadoresQuePagaronEnMes);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};
