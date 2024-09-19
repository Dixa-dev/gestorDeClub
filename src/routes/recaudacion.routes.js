
import { Router } from "express"


import * as recaudacion from "../controllers/recaudacion.controllers.js"



const router =  Router()

router.get('/',recaudacion.obtenerRecaudacion)
router.post('/',recaudacion.crearRecaudacion)




export default router



