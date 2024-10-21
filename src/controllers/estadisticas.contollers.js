import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const tortaJugadoresCuotas = async (req, res) => {
  try {
    // Obtener el total de jugadores
    const totalJugadores = await prisma.jugadores.count();

    // Obtener los pagos agrupados por mes y año
    const pagosPorMes = await prisma.cuotas.groupBy({
      by: ['mes', 'anio'],  // Agrupar por mes y año
      _count: {
        jugadorId: true,
      },
    });

    // Crear un objeto para llevar la cuenta de los jugadores que pagaron
    const data = pagosPorMes.map(({ mes, anio, _count }) => {
      const jugadoresPagaron = _count.jugadorId;
      const jugadoresNoPagaron = totalJugadores - jugadoresPagaron;

      return {
        mes,
        anio,
        pagaron: jugadoresPagaron,
        noPagaron: jugadoresNoPagaron,
      };
    });

    return res.json(data);

  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
};

