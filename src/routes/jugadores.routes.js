import { Router } from "express";
import * as jugadores from "../controllers/jugadores.controllers.js";

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Jugador:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - dni
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the jugador
 *         nombre:
 *           type: string
 *           description: The jugador's first name
 *         apellido:
 *           type: string
 *           description: The jugador's last name
 *         dni:
 *           type: string
 *           description: The jugador's unique DNI
 *         celular:
 *           type: string
 *           description: The jugador's cellphone number
 *         celularEmergencia:
 *           type: string
 *           description: Emergency contact number
 *         fechaNacimiento:
 *           type: string
 *           format: date
 *           description: Birthdate of the jugador
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *         cuotas:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Cuota'
 *         createAd:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 */

/**
 * @swagger
 * /jugadores:
 *   get:
 *     summary: Returns a list of jugadores
 *     tags: [Jugadores]
 *     responses:
 *       200:
 *         description: List of jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jugador'
 */

router.get("/:id", jugadores.obtenerJugadorPorId);

router.post("/registro", jugadores.crearJugador);

router.put("/:id", jugadores.actualizarJugador);

router.get("/", jugadores.obtenerTodosJugadores);

router.delete("/:id", jugadores.eliminarJugador);

export default router;
