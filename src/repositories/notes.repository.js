import Note from '../models/note.model.js';

const notesRepository = {
    // 1. Guarda una nota nueva en la base de datos
    guardar: async (datosNota) => {
        const nuevaNota = new Note(datosNota);
        return await nuevaNota.save();
    },

    // 2. Busca todas las notas que le pertenezcan a un autor específico
    // ¡Acá usamos tu lógica bostera de ordenamiento!
    buscarPorAutor: async (fk_id_autor) => {
        return await Note.find({ fk_id_autor, activo: true })
            .sort({ fecha_actualizacion: -1 });
        // El -1 significa orden descendente: la nota que se actualizó más recientemente va primero
    },

    // 3. Busca una sola nota por su ID único de Mongo
    buscarPorId: async (id_nota) => {
        return await Note.findById(id_nota);
    },

    // 4. Modifica los datos de una nota existente
    modificar: async (id_nota, datosNuevos) => {
        // { new: true } le dice a Mongo que nos devuelva la nota ya modificada para mandarla al frontend
        return await Note.findByIdAndUpdate(id_nota, datosNuevos, { new: true });
    },

    // 5. Borrado físico: Elimina el registro por completo de la base de datos
    borrar: async (id_nota) => {
        return await Note.findByIdAndDelete(id_nota);
    }
};

export default notesRepository;