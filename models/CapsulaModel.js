import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: String,
    cupsize: String,
    intensidad: Number,
    sabor: String
});

const Capsula = mongoose.model('Capsula', esquema);


export default Capsula;