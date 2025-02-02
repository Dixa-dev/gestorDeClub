import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const crearGastos = async (req, res) => {
  try {
    const { nombre, monto, eventoId } = req.body;

    const gastos = await prisma.gastos.create({
      data: {
        nombre,
        monto,
        eventoId,
      },
    });
    res.status(200).json(gastos);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

export const obtenerGastosId = async (req, res) => {
  try {
    const { id } = req.params;
    const gastos = await prisma.gastos.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        evento: true,
      },
      
      
    });
    
    
    res.status(200).json(gastos);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const obtenerGastos = async (req, res) => {

    const gastosTotales = await prisma.gastos.findMany();

    if (gastosTotales.length === 0) {
      return res.status(404).json({ message: "No hay gastos registrados" });
    }

    res.status(200).json(gastosTotales);
  
};



 
