import { Router } from "express";
import * as gastos from "../controllers/gastos.controllers.js";


const router = Router();




router.get("/:id", gastos.obtenerGastosId);
router.get("/", gastos.obtenerGastos);
router.post("/", gastos.crearGastos);

export default router;
