import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


export const obtenerTodoEgresos = async (req, res) =>{
    try {
        const egresos = await prisma.egresoMensuales.findMany()
        if(!egresos){
            return res.status(404).json({message: 'No hay engresos registrados'})
        }
        res.status(200).json(egresos)
      
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Error al obtener los engresos'})
    } 
  
} 

export const crearEgreso = async (req, res) => {
    try {
        const { monto,nombre,mes,anio,balanceId} = req.body
        const egresos = await prisma.egresoMensuales.create({
            data: {
                monto,
                nombre,
                anio,
                mes,
                balanceId,
            },
        })
        res.status(201).json(egresos)
    } catch (error) {
        return res.status(500).json({message: 'Error'})
    }
}

export const obtenerEgresoPorId = async (req, res) =>{

    try {
        const { id } = req.params
        const egreso = await prisma.egresoMensuales.findUnique({
            where: {
                id: Number(id),
            },
        })
        
        if(!egreso){
            return res.status(404).json({message: 'Egreso no encontrado'})
        }
    } catch (error) {
        return res.status(500).json({message: 'Error'})
    }
    res.status(200).json(egreso)
}