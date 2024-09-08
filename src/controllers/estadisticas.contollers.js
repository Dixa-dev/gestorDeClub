import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const tortaJugadoresCuotas = async (req, res) => {
  try {
    const mes = "Enero"; // Puedes ajustar esto según lo que necesites

    // Contar el número total de jugadores
    const totalJugadores = await prisma.jugadores.count();

    // Contar el número de jugadores que han pagado en el mes especificado
    const jugadoresQuePagaron = await prisma.cuotas.count({
      where: {
        mes: mes,
        
      },
    });

    // Contar los jugadores únicos que han pagado
    const jugadoresUnicosQuePagaron = await prisma.cuotas.groupBy({
      by: ['jugadorId'],
      where: {
        mes: mes,
        
      },
      _count: {
        jugadorId: true,
      },
    });

    // Contar el número de jugadores que no han pagado
    const jugadoresNoPagaron = totalJugadores - jugadoresUnicosQuePagaron.length;

    // Formatear los datos para el frontend
    const data = [
      { name: 'Pagaron', value: jugadoresUnicosQuePagaron.length },
      { name: 'No Pagaron', value: jugadoresNoPagaron },
    ];

    console.log(tortaJugadoresCuotas);
    return res.json(data);
    
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las estadísticas' });
  }
  
  
  };
  
