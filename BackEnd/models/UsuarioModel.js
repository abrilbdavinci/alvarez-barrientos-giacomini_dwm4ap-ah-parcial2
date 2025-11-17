import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: String,
    email: String,
    password: String
});

const User = mongoose.model('User', esquema);


export default User;