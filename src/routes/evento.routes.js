import { Router } from "express";
import * as evento from "../controllers/evento.controllers.js"
import { verificarRole } from "../middlewares/rutasProtegidas.js";
import jwt from "../../src/middlewares/jwt.js"

const router = Router();

router.get('/:id',evento.obtenerFechaId)

router.post('/', evento.crearFecha)

router.get('/',evento.obtenerTodos)


export default router
