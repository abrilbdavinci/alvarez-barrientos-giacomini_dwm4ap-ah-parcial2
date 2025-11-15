import Maquina from '../models/MaquinaModel.js'

const newMaquina = async( request, response ) =>{
    const {nombre, tipo, desc} = request.body;
    const maquina = new Maquina({nombre, tipo, desc});
    const data = await maquina.save();
    response.status(201).json({ msg:"Maquina creada", data});
}

const listMaquinas = async (request, response) =>{
    const maquinas = await Maquina.find();
    response.json(maquinas);
}

const getMaquinaById = async (request, response) => {
    const id = request.params.id;
    const maquina = await Maquina.findById(id);
    if( maquina){
        response.status(200).json({data: maquina});
    } else {
        response.status(404).json({msg: 'maquina no encontrada'});
    }
}

const deleteMaquinaById = async( request, response) =>{
    const id = request.params.id;
    const maquina = await Maquina.findByIdAndDelete(id);
    if ( maquina ){
        response.status(200).json({msg:'Maquina Eliminada'});
    } else {
        response.status(404).json({msg: 'Maquina no encontrada'});
    }
}

const updateMaquinaById = async( request, response) =>{
    const id = request.params.id;
    const body = request.body;

    const maquina = await Maquina.findByIdAndUpdate(id, body);
    if ( maquina ){
        response.status(200).json({msg:'Maquina Actualizada'});
    } else {
        response.status(404).json({msg: 'Maquina no encontrada'});
    }
}

const getMaquinaByNombre = async (request, response) => {
    const nombre = request.params.nombre.trim().toLowerCase();
    const maquinas = await Maquina.find();
    const maquinasXnombre = maquinas.filter(m => m.nombre.toLowerCase() === nombre);
    if( maquinasXnombre.length > 0){
        response.status(200).json({data: maquinasXnombre});
    } else {
        response.status(404).json({msg: 'Maquina no encontrada'});
    }
}

export { newMaquina, listMaquinas, getMaquinaById, deleteMaquinaById, updateMaquinaById, getMaquinaByNombre };