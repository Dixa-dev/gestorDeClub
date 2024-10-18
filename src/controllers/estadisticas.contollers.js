import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const tortaJugadoresCuotas = async (req, res) => {

     
  try {

    const {mes} = req.body;
    //? const mes = "Enero"

    
    const totalJugadores = await prisma.jugadores.count();

  

    
    const jugadoresUnicosQuePagaron = await prisma.cuotas.groupBy({
      by: ['jugadorId'],
      where: {
        mes: mes,
        
      },
      _count: {
        jugadorId: true,
      },
    });

   
    const jugadoresNoPagaron = totalJugadores - jugadoresUnicosQuePagaron.length;

   
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
  

  
