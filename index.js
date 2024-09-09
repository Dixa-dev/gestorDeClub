import express from 'express';
import cors from 'cors';
import jugadoresRoutes from "./src/routes/jugadores.routes.js"
import cuotasRoutes from "./src/routes/cuotas.routes.js"
import sumaRoutes from "./src/routes/suma.routes.js"
import adminRoutes from "./src/routes/administrador.routes.js"
import usuariosRoutes from "./src/routes/user.routes.js"
import gastosRoutes from "./src/routes/gastos.routes.js"
import estasdisticasRoutes from "./src/routes/estadisticas.routes.js"
import { config } from 'dotenv';

import {  verificarRole } from './src/middlewares/rutasProtegidas.js';
import { protegidoAdmin } from './src/middlewares/usuariosRoles.js';
// verificarRole(['SUPER', 'ADMIN'])


config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/login", usuariosRoutes);
app.use("/api/usuarios",usuariosRoutes);
app.use("/api/jugadores",jugadoresRoutes);
app.use("/api/cuotas",cuotasRoutes);
app.use("/api/administracion",adminRoutes);
app.use("/api/gastos",gastosRoutes)
app.use("/api/suma", sumaRoutes);
app.use("/api/estadisticas",protegidoAdmin,estasdisticasRoutes)

app.get("/", (req, res) => {
  res.send("Hola, este es el inicio de la API");
});

app.listen(3000);
console.log("Server listening on,3000");

