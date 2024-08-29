import { Router } from "express";
import * as jugadores from "../controllers/jugadores.controllers.js"



const router = Router();



router.get("/:id",jugadores.obtenerJugadorPorId)

router.post("/",jugadores.crearJugador );

router.put(':id',jugadores.actualizarJugador)

router.get("/",jugadores.obtenerTodosJugadores );

router.delete(':id',jugadores.eliminarJugador )



export default router;
