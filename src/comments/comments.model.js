import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentsSchema = mongoose.Schema({
    idUser: {
        type: String,
        ref: "User",
        required: [true, "The User is obligatory"],
    },
    idPublicaction: {
        type: String,
        ref: "Publications",
        required: [true, "The publicaction is obligatory"],
    },
    descriptionComment: {
        type: String,
        required: [true, "The description is obligatory"],
    },
    estado: {
        type: Boolean,
        default: true,
    }
});

export default mongoose.model('Comments', CommentsSchema);