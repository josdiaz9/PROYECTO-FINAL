import notesRepository from '../repositories/notes.repository.js';

const noteMiddleware = async (req, res, next) => {
    try {
        const { id_nota } = req.params;
        const usuario_logueado_id = req.user.id; // Este ID ya lo dejó masticado el authMiddleware

        // 1. Checkear que la nota exista en la base de datos
        const nota = await notesRepository.buscarPorId(id_nota);

        if (!nota) {
            return res.status(404).json({
                ok: false,
                message: "Error: La nota que estás buscando no existe"
            });
        }

        // 2. Checkear que el usuario logueado sea el VERDADERO autor de la nota
        // Comparamos el fk_id_autor de la nota con el ID del token del usuario
        if (nota.fk_id_autor.toString() !== usuario_logueado_id.toString()) {
            return res.status(403).json({
                ok: false,
                message: "Error de seguridad: No tenés permisos para acceder a esta nota"
            });
        }

        // Si pasó los dos controles, guardamos la nota en el objeto 'req' 
        // por si el controlador la necesita, y le damos luz verde para continuar
        req.nota = nota;

        next(); // ¡Le da el pase al controlador!

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Hubo un error en el control de seguridad de la nota",
            error: error.message
        });
    }
};

export default noteMiddleware;