import express from 'express';
import notesController from '../controllers/notes.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js'; // El patovica de login
import noteMiddleware from '../middlewares/note.middleware.js'; // El patovica de tu diagrama

const notesRouter = express.Router();

// 1. POST /api/notes -> Crear una nota
// Solo necesita authMiddleware para saber qué usuario está logueado
notesRouter.post(
    '/',
    authMiddleware,
    notesController.crearNota
);

// 2. GET /api/notes -> Devuelve lista de notas del usuario
// Solo necesita authMiddleware para traer las notas que le pertenecen a ese ID
notesRouter.get(
    '/',
    authMiddleware,
    notesController.obtenerNotasUsuario
);

// 3. GET /api/notes/:id_nota -> Devuelve el detalle de una nota
// ¡Acá entra tu noteMiddleware! Verifica que exista y que seas el autor antes de mostrártela
notesRouter.get(
    '/:id_nota',
    authMiddleware,
    noteMiddleware,
    notesController.obtenerNotaPorId
);

// 4. PUT /api/notes/:id_nota -> Actualizar una nota
// Pasa por los dos filtros antes de dejarte modificar el título o contenido
notesRouter.put(
    '/:id_nota',
    authMiddleware,
    noteMiddleware,
    notesController.actualizarNota
);

// 5. DELETE /api/notes/:id_nota -> Eliminar nota
// Pasa por los dos filtros antes de borrar o desactivar la nota
notesRouter.delete(
    '/:id_nota',
    authMiddleware,
    noteMiddleware,
    notesController.eliminarNota
);

export default notesRouter;