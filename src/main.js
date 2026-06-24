import ENVIRONMENT from "./config/environment.config.js";
import connectMongoDB from "./config/mongodb.config.js";
import express from "express";

/* SOLO EN LOCAL Y SI TENER PROBLEMAS DE DNS PARA CONECTARTE A MONGODB */
import dns from 'dns';
import authRouter from "./routes/auth.router.js";
/*import authMiddleware from "./middlewares/auth.middleware.js";*/

if (ENVIRONMENT.MODE === 'development') {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
}

connectMongoDB()

import cors from 'cors'
import errorHandlerMiddleware from "./middlewares/error.middleware.js";

const app = express();
const PORT = ENVIRONMENT.PORT;

// Habilitamos las consultas cross-origin
app.use(cors())

// Parse JSON
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/workspace', workspaceRouter)

//Siempre debe estar al final
//Esto es debido a que este middleware se ejecutara entre el controller y la response del servidor
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
