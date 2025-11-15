import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: String,
    marca: String,
    descripcion: String,
    ingredientes: String
});

const Producto = mongoose.model('Producto', esquema);


export default Producto;