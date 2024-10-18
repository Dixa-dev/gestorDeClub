import { Router } from "express";
import * as ingresos from "../controllers/ingresosMensuales.controllers.js"


const router = Router();

router.post('/', ingresos.crearIngreso);
router.get('/:id', ingresos.obtenerIngresoPorId);
router.get('/', ingresos.obtenerTodoIngresos);


export default router;