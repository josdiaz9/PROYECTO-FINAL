import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        required: true,
        default: Date.now()
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    }
});

export const NOTE_COLLECTION_NAME = 'Note'

const Note = mongoose.model(NOTE_COLLECTION_NAME, noteSchema)

export default Note;
