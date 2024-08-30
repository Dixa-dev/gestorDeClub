<<<<<<< HEAD
import express from "express";
import jugadoresRoutes from "./src/routes/jugadores.routes.js";
import cors from "cors"

=======
import express from 'express';
import jugadoresRoutes from "./src/routes/jugadores.routes.js"
import { config } from 'dotenv';

config()
>>>>>>> 90d67199f558fa6f500ab1714874cad55bf39841
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jugadores", jugadoresRoutes);

app.get("/", (req, res) => {
  res.send("Hola, este es el inicio de la API");
});

app.listen(3000);
console.log("Server listening on,3000");
