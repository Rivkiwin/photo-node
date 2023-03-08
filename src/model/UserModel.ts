import mongoose from "mongoose";
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
}, {
    timestamps: true
})
userSchema.pre('save', function (next) {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
        // Saving reference to this because of changing scopes
        const document = this;
        bcrypt.hash(document.password, 10,
            function (err: mongoose.CallbackError | undefined, hashedPassword: string) {
                if (err) {
                    next(err);
                }
                else {
                    document.password = hashedPassword;
                    next();
                }
            });
    } else {
        next();
    }
});
const UserModel = mongoose.model('User', userSchema);
export default UserModel;