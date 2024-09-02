import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const obtenerTodosJugadores = async (req, res) => {
    const jugadores = await prisma.jugadores.findMany({
     
    });
   
    res.json(jugadores);
  }


  export const obtenerJugadorPorId = async (req, res) => {
    const { id } = req.params;
    const jugador = await prisma.jugadores.findUnique({
      where: {
        id: Number(id),
      },
      include:{
        cuotas:true,
      }
      
    });
    if (!jugador) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }
    res.json(jugador);
  }


  export const crearJugador = async (req, res) => {

      const {
        nombre,
        apellido,
        dni,
        celular,
        fechaNacimiento,
        celularEmergencia,
        categoria
      } = req.body;
  
      
    try {
      const jugadores = await prisma.jugadores.findUnique({
        where: {
          dni: req.body.dni,
        },
      })
      if(jugadores){
        return res.status(409).json({ message: "Jugador con ese DNI ya existe" });
      }
        
        const jugador = await prisma.jugadores.create({
          data: {
            nombre:nombre,
            apellido,
            dni,
            celular,
            fechaNacimiento,
            celularEmergencia,
            categoria
          },
        });
       

         return res.json(jugador);
    } catch (error) {
        return res.status(404).json({ message: error.message})
    }
    
     
  }


export const actualizarJugador = async (req, res) => {

  
    try {
      const {id} = req.params;

      if (!id) {
        return res.status(404).json({ message: 'Id del jugador no válido' });
      }
      
      const actualizarElJugador = await prisma.jugadores.update({
        where:{
          id: Number(id)
        },
        data: req.body,
      })
     
      } catch (error) {
        return res.status(404).json({massage:'jugador no actualizado'})
      }
      return res.json(actualizarJugador)
     
    }



    export const eliminarJugador = async (req, res) => {
      
             
    try {
     
      const {id} = req.params
  

      if (!id) {
        return res.status(404).json({ message: 'Id del jugador no válido' });
      }

      const eliminarJugador = await prisma.jugadores.delete({

        where: {
          id: Number(id),
        },
        
       
      }
    );
      if (!eliminarJugador) {
        return res.status(404).json({ message: 'Jugador no encontrado' });
      }
    } catch (error) {
      return res.status(404).json({ message: 'Jugador no eliminado' });
    }
    return res.json(eliminarJugador)
  }