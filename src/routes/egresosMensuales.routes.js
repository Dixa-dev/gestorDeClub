import { Router } from "express";
import * as egresos from "../controllers/egresosMensuales.controllers.js"


const router = Router();

router.post('/', egresos.crearEgreso);
router.get('/:id', egresos.obtenerEgresoPorId);
router.get('/', egresos.obtenerTodoEgresos);


export default router;