import mongoose from "mongoose"

const photoSchema = new mongoose.Schema({
    albumId: {
        required: true,
        type: String
    },
    title: String,
    url: {
        required: true,
        type: String
    },
    addBy: String
}, {
    timestamps: true,
},)

export const PhotoModel = mongoose.model('Photo', photoSchema);