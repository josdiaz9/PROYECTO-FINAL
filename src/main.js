process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import express from "express";

/* SOLO EN LOCAL Y SI TENER PROBLEMAS DE DNS PARA CONECTARTE A MONGODB */
import dns from 'dns';
import authRouter from "./routes/auth.router.js";
import notesRouter from "./routes/notes.router.js"; // <--- 1. IMPORTAMOS TU ROUTER DE NOTAS

if (ENVIRONMENT.MODE === 'development') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

connectMongoDB()

import cors from 'cors'

const app = express();
const PORT = ENVIRONMENT.PORT;

app.use(cors())
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter); // <--- 2. REGISTRAMOS LA RUTA BASE PARA LAS NOTAS

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});