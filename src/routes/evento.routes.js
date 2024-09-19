import { Router } from "express";
import * as evento from "../controllers/evento.controllers.js"

const router = Router();

router.get('/:id',evento.obtenerFechaId)

router.post('/', evento.crearFecha)

router.get('/',evento.obtenerTodos)


export default router
