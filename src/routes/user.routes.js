import { Router } from "express";
import * as usuarios from "../controllers/user.controllers.js"


const router = new Router();




router.get('/',usuarios.obtenerUsuarios )
    

 router.get('/:id', usuarios.obtenerUsuariosId);


router.post('/', usuarios.login)



export default router