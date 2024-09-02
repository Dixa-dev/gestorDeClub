import { Router } from "express";
import * as cuotas from "../controllers/cuotas.controllers.js"

const router = new Router();


router.post("/", cuotas.crearCuota);
router.get("/", cuotas.obtenerCuotas)
router.get("/:id", cuotas.obtenerCuotaPorId)

export default router;