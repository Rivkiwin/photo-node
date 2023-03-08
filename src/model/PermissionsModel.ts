import mongoose from "mongoose"

const permissionsSchema = new mongoose.Schema({
    albumId: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: String
    },
    share:  {
        required: true,
        type: Boolean,
        default: false
    },
    add: {
        required: true,
        type: Boolean,
        default: false
    },
    delete: {
        required: true,
        type: Boolean, 
        default: false
    },
    editPermissions: {
        required: true,
        type: Boolean, 
        default: false
    },
    addBy: String,
},
    { timestamps: true }
)

export const PermissionsModel = mongoose.model('Permissions', permissionsSchema);