import mongoose  from 'mongoose';

const Schema = mongoose.Schema;


const esquema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', esquema);


export default User;