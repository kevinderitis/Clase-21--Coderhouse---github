import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String
})
const userService = mongoose.model('usuarios', usuarioSchema)

export default userService;