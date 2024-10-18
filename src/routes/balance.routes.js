import { Router } from "express";
import * as balance from "../controllers/balance.controllers.js"

const router = Router();

router.get('/', balance.obtenerTodosBalances);
router.get('/:id', balance.obtenerBalancePorId);
router.post('/', balance.crearBalance);


export default router