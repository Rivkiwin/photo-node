import mongoose from "mongoose"

const albumSchema = new mongoose.Schema({
    title: String,
    createBy: String
},{
    timestamps: true,
  });

export const AlbumModel = mongoose.model('Album', albumSchema);