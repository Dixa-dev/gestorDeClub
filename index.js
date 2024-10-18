import express from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger/swagger.js';
import cors from 'cors';
import jugadoresRoutes from "./src/routes/jugadores.routes.js"
import cuotasRoutes from "./src/routes/cuotas.routes.js"
import sumaRoutes from "./src/routes/suma.routes.js"
import eventoRoutes from "./src/routes/evento.routes.js"
import recaudacionRoutes from "./src/routes/recaudacion.routes.js"
import usuariosRoutes from "./src/routes/user.routes.js"
 import egresoRoutes from "./src/routes/egresosMensuales.routes.js"
 import ingresoRoutes from "./src/routes/ingresosMensuales.routes.js"
 import balanceRoutes from "./src/routes/balance.routes.js"
import gastosRoutes from "./src/routes/gastos.routes.js"
import estasdisticasRoutes from "./src/routes/estadisticas.routes.js"
import jwt from "./src/middlewares/jwt.js"
import { config } from 'dotenv';
import {verificarCobrador,verificarSuper,verificarAdmin} from "./src/middlewares/jwt.js"

// verificarRole(['SUPER', 'ADMIN'])


config()
const app = express();

app.use(cors());
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'https://gestor-de-club.vercel.app'], 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  credentials: true, // Si necesitas permitir cookies o autenticación
};

app.use(express.urlencoded({ extended: true }));

app.use("/api/docs",cors(corsOptions),swaggerUi.serve ,swaggerUi.setup(specs))
app.use("/api/login", usuariosRoutes);
app.use("/api/usuarios",usuariosRoutes);
app.use("/api/jugadores",jugadoresRoutes);
app.use("/api/cuotas",cuotasRoutes);
app.use("/api/eventos",eventoRoutes);
app.use("/api/gastos",gastosRoutes)
app.use("/api/recaudacion",recaudacionRoutes)
app.use("/api/egresosMensuales",egresoRoutes)
app.use("/api/ingresosMensuales",ingresoRoutes)
app.use("/api/balance",balanceRoutes)
app.use("/api/suma", sumaRoutes);
app.use("/api/estadisticas",estasdisticasRoutes)

app.get("/", (req, res) => {
  res.send("Hola, este es el inicio de la API");


});
console.log("Server listening on");
app.listen( 3000 );



