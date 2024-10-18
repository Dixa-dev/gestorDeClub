import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const obtenerTodoIngresos = async (req, res) =>{
    try {
        const ingresos = await prisma.ingresoMensuales.findMany()
        if(!ingresos){
            return res.status(404).json({message: 'No hay engresos registrados'})
        }
        res.status(200).json(ingresos)
      
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error al obtener los engresos'})
    } 
  
} 

export const crearIngreso = async (req, res) => {
    try {
        const { monto,nombre,mes,anio,balanceId} = req.body
        const ingresos = await prisma.ingresoMensuales.create({
            data: {
                monto: monto,
                nombre: nombre,
                mes: mes,
                anio,
                balanceId,
            },
        })
        res.status(201).json(ingresos)
    } catch (error) {
        return res.status(500).json({message: 'Error'})
    }
}

export const obtenerIngresoPorId = async (req, res) =>{

    try {
        const { id } = req.params
        const ingreso = await prisma.ingresoMensuales.findUnique({
            where: {
                id: Number(id),
            },
        })
        
        if(!ingreso){
            return res.status(404).json({message: 'Ingreso no encontrado'})
        }
    } catch (error) {
        return res.status(500).json({message: 'Error'})
    }
    res.status(200).json(ingreso)
}