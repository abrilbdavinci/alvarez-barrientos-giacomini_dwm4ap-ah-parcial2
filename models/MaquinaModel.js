import mongoose  from 'mongoose';

const Schema = mongoose.Schema;

const esquema = new Schema({
    nombre: String,
    tipo: String,
    desc: String
});

const Maquina = mongoose.model('Maquina', esquema);


export default Maquina;