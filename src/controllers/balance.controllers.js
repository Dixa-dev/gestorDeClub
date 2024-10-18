import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const obtenerTodosBalances = async (req , res) => {

  
    try {
          const balance = await prisma.balance.findMany()
          if(!balance.length){
           return res.status(404).json({error: "no se encontaron los balances"})
          } 
          res.json(balance)
    } catch (error) {
        
      res.status(400).json({ error: error.message })
    }
  

 


}

export const crearBalance = async (req , res) => {
  try {
    const {anio,mes,}=req.body
    const balanceCreado = await prisma.balance.create({
      data: {
        anio:anio,
        mes:mes,
      }
    })
    res.json(balanceCreado)
  } catch (error) {
    res.status(500).json({message:"Error server"})
  }
}


export const obtenerBalancePorId = async (req , res) => {
  
  try {
    const { id } = req.params;
    const balance = await prisma.balance.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        ingreso: true,
        egresos: true,
      },
    })

    

    if(!balance){
     return  res.status(404).json({error: "no se encontro el balance"})
    }
    res.json(balance)

  } catch (error) {
    res.status(500).json({error: "de server"})
  }
  
}