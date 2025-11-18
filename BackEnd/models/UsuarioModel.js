import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

<<<<<<< HEAD

const esquema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
=======
const esquema = new Schema({
    nombre: String,
    email: String,
    password: String
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
});

const User = mongoose.model('User', esquema);


export default User;