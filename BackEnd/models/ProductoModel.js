import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: String,
    marca: { type: Schema.Types.ObjectId, ref: 'Marca', required: true },
    tipo: String,
    descripcion: String,
    tags: [String],
    activos: String,
    formula: String
});

const Producto = mongoose.model('Producto', esquema);


export default Producto;