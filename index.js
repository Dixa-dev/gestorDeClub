import express from 'express';
import cors from 'cors';
import jugadoresRoutes from "./src/routes/jugadores.routes.js"
import cuotasRoutes from "./src/routes/cuotas.routes.js"
import { config } from 'dotenv';

config()
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jugadores", jugadoresRoutes);
app.use("/api/cuotas", cuotasRoutes);

app.get("/", (req, res) => {
  res.send("Hola, este es el inicio de la API");
});

app.listen(3000);
console.log("Server listening on,3000");
