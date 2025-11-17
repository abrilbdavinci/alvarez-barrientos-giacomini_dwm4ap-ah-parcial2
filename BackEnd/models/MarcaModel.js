import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: String,
    origen: String
});

const Marca = mongoose.model('Marca', esquema);


export default Marca;