import notesRepository from '../repositories/notes.repository.js';

const notesService = {
    // 1. Lógica para crear una nota nueva
    crearNota: async ({ titulo, contenido, fk_id_autor }) => {
        if (!titulo || !contenido) {
            throw new Error("El título y el contenido son obligatorios");
        }

        // Le pasamos el objeto armado al repositorio
        return await notesRepository.guardar({
            titulo,
            contenido,
            fk_id_autor
        });
    },

    // 2. Lógica para traer todas las notas del usuario logueado
    obtenerNotasPorUsuario: async (fk_id_autor) => {
        // Le pide al repositorio que busque por el ID del autor
        return await notesRepository.buscarPorAutor(fk_id_autor);
    },

    // 3. Lógica para ver una sola nota por su ID
    obtenerNotaPorId: async (id_nota) => {
        const nota = await notesRepository.buscarPorId(id_nota);
        if (!nota) {
            throw new Error("La nota no existe");
        }
        return nota;
    },

    // 4. Lógica para actualizar el título o contenido de la nota
    actualizarNota: async (id_nota, { titulo, contenido }) => {
        if (!titulo || !contenido) {
            throw new Error("No podés dejar el título o el contenido vacíos al editar");
        }

        const datosActualizados = {
            titulo,
            contenido,
            fecha_actualizacion: Date.now() // <--- ¡CON PARÉNTESIS! Clavamos el milisegundo exacto de la edición
        };

        const notaModificada = await notesRepository.modificar(id_nota, datosActualizados);
        if (!notaModificada) {
            throw new Error("No se pudo actualizar la nota");
        }

        return notaModificada;
    },

    // 5. Lógica para eliminar una nota
    eliminarNota: async (id_nota) => {
        // Borrado Físico (la elimina de la base de datos). 
        // Si después preferís borrado lógico (activo: false), lo cambiamos en el repositorio.
        const notaEliminada = await notesRepository.borrar(id_nota);
        if (!notaEliminada) {
            throw new Error("La nota no se pudo eliminar o ya no existía");
        }
        return true;
    }
};

export default notesService;