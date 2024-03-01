import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    idUser: {
        type: String,
        ref: "User",
        required: [true, "The User is obligatory"],
    },
    title: {
        type: String,
        required: [true, "The title is obligatory"],
    },
    category: {
        type: String,
        required: [true, "The category is obligatory"],
    },
    description: {
        type: String,
        required: [true, "The description is obligatory"],
    }
});

export default mongoose.model('Publications', PublicationSchema);