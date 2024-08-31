import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearCuota = async (req, res) => {
  const { mes, monto, fechaPago, comprobantePago, jugadorId  } = req.body;
console.log(req.body);
  try {

    if (!mes || !monto || !fechaPago || !comprobantePago || !jugadorId) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    
    const cuotas = await prisma.cuotas.findFirst({
      where: {
        OR: [
          { mes },
          { comprobantePago },
          { jugadorId}
        ]
      }
    })

    if ( cuotas ) {
      return res.status(400).json({ message: `la cuota ${mes} ya existe o el comprobante ${comprobantePago} existen` });
    }
    
    const cuotaCreada = await prisma.cuotas.create({
      data: {
        mes:mes,
        monto:monto,
        fechaPago:fechaPago,
        comprobantePago:comprobantePago,
        jugador: { connect: { id: jugadorId} },
      }
    });
    console.log(crearCuota);
    
    res.status(201).json(cuotaCreada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const obtenerCuotas = async (req, res) => {
  try {
    const cuotas = await prisma.cuotas.findMany({
      include: {
        jugador: true, // Incluye la información del jugador relacionado si lo deseas
      },
    });
    res.status(200).json(cuotas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};