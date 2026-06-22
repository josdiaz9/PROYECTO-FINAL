import mongoose from 'mongoose';

const userNoteSchema = new mongoose.Schema({
    fk_nota_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    },
    fk_usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fecha_asociacion: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const USER_NOTE_COLLECTION_NAME = 'UserNote';

const UserNote = mongoose.model(USER_NOTE_COLLECTION_NAME, userNoteSchema);

export default UserNote;