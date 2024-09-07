import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

router.get("/", async (req, res) => {
  const { mes } = req.body;
  try {
    const sumaMontos = await prisma.cuotas.aggregate({
      _sum: {
        monto: true,
      },
      where: {
        mes: mes,
      },
    });

    if (sumaMontos._sum.monto === null) {
      return res
        .status(200)
        .json({ message: `No se encontraron montos para el mes ${mes}` });
    }

    console.log(`Suma de montos para el mes ${mes}:`, sumaMontos._sum.monto);

    res.status(200).json({ sumaMontos: sumaMontos._sum.monto });
  } catch (error) {
    console.error("Error al sumar los montos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});






export default router;
