import notesService from '../services/notes.service.js';

const notesController = {
    // 1. POST /api/notes -> Crear una nota
    crearNota: async (req, res) => {
        try {
            const { titulo, contenido } = req.body;
            // El id del autor viaja en el token, el authMiddleware lo rescata y lo deja acá:
            const fk_id_autor = req.user.id;

            // Le pasamos el paquete completo al servicio
            const nuevaNota = await notesService.crearNota({ titulo, contenido, fk_id_autor });

            return res.status(201).json({
                ok: true,
                message: "Nota creada y guardada con éxito",
                data: nuevaNota
            });
        } catch (error) {
            return res.status(500).json({ ok: false, message: error.message });
        }
    },

    // 2. GET /api/notes -> Traer todas las notas de este usuario
    obtenerNotasUsuario: async (req, res) => {
        try {
            const fk_id_autor = req.user.id; // Buscamos solo las notas del que está logueado
            const notas = await notesService.obtenerNotasPorUsuario(fk_id_autor);

            return res.status(200).json({
                ok: true,
                data: notas
            });
        } catch (error) {
            return res.status(500).json({ ok: false, message: error.message });
        }
    },

    // 3. GET /api/notes/:id_nota -> Ver detalle de una nota
    obtenerNotaPorId: async (req, res) => {
        try {
            const { id_nota } = req.params;
            const nota = await notesService.obtenerNotaPorId(id_nota);

            return res.status(200).json({
                ok: true,
                data: nota
            });
        } catch (error) {
            return res.status(500).json({ ok: false, message: error.message });
        }
    },

    // 4. PUT /api/notes/:id_nota -> Modificar una nota
    actualizarNota: async (req, res) => {
        try {
            const { id_nota } = req.params;
            const { titulo, contenido } = req.body;

            const notaActualizada = await notesService.actualizarNota(id_nota, { titulo, contenido });

            return res.status(200).json({
                ok: true,
                message: "Nota modificada correctamente",
                data: notaActualizada
            });
        } catch (error) {
            return res.status(500).json({ ok: false, message: error.message });
        }
    },

    // 5. DELETE /api/notes/:id_nota -> Eliminar una nota
    eliminarNota: async (req, res) => {
        try {
            const { id_nota } = req.params;

            await notesService.eliminarNota(id_nota);

            return res.status(200).json({
                ok: true,
                message: "Nota eliminada con éxito"
            });
        } catch (error) {
            return res.status(500).json({ ok: false, message: error.message });
        }
    }
};

export default notesController;