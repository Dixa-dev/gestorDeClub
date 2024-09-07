import { Router } from "express";
import * as estadisticas from "../controllers/estadisticas.contollers.js"

const router =  Router();




router.get('/', estadisticas.tortaJugadoresCuotas);



export default router