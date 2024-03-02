import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    idUser: {
        type: String,
        ref: "User",
        required: [true, "The User is obligatory"],
    },
    nameUser: {
        type: String,
        ref: "User",
        required: [true, "The user's name is obligatory"],
    },
    title: {
        type: String,
        required: [true, "The title is obligatory"],
    },
    category: {
        type: String,
        required: [true, "The category is obligatory"],
    },
    idComent: {
        type: String,
        ref: "Comment"
    },
    description: {
        type: String,
        required: [true, "The description is obligatory"],
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model('Publications', PublicationSchema);