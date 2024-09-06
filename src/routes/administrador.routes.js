import { Router } from "express";
import * as administacion from "../controllers/administrador.controllers.js"

const router = Router();

router.get('/:id',administacion.obtenerFechaId)

router.post('/', administacion.crearFecha)

router.get('/',administacion.administraciones)


export default router
