import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: String,
<<<<<<< HEAD
    marca: { type: Schema.Types.ObjectId, ref: 'Marca', required: true },
=======
    marca: String,
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
    tipo: String,
    descripcion: String,
    tags: [String],
    activos: String,
    formula: String
});

const Producto = mongoose.model('Producto', esquema);


export default Producto;