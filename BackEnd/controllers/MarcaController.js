import Marca from '../models/MarcaModel.js'

const newMarca = async( request, response ) =>{
    const {nombre, origen} = request.body;
    const marca = new Marca({nombre, origen});
    const data = await marca.save();
    response.status(201).json({ msg:"Marca creada", data});
}

<<<<<<< HEAD
const listMarcas = async (request, response) => {
    // Paginación y filtro por nombre
    const { page = 1, limit = 10, nombre } = request.query;
    const query = {};
    if (nombre) {
        query.nombre = { $regex: nombre, $options: 'i' };
    }
    const marcas = await Marca.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
    const total = await Marca.countDocuments(query);
    response.json({ total, page: Number(page), limit: Number(limit), data: marcas });
=======
const listMarcas = async (request, response) =>{
    const marcas = await Marca.find();
    response.json(marcas);
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
}

const getMarcaById = async (request, response) => {
    const id = request.params.id;
    const marca = await Marca.findById(id);
    if( marca){
        response.status(200).json({data: marca});
    } else {
        response.status(404).json({msg: 'marca no encontrada'});
    }
}

const deleteMarcaById = async( request, response) =>{
    const id = request.params.id;
    const marca = await Marca.findByIdAndDelete(id);
    if ( marca ){
        response.status(200).json({msg:'Marca Eliminada'});
    } else {
        response.status(404).json({msg: 'Marca no encontrada'});
    }
}

const updateMarcaById = async( request, response) =>{
    const id = request.params.id;
    const body = request.body;

    const marca = await Marca.findByIdAndUpdate(id, body);
    if ( marca ){
        response.status(200).json({msg:'Marca Actualizada'});
    } else {
        response.status(404).json({msg: 'Marca no encontrada'});
    }
}

const getMarcaByNombre = async (request, response) => {
    const nombre = request.params.nombre.trim().toLowerCase();
    const marcas = await Marca.find();
    const marcasXnombre = marcas.filter(m => m.nombre.toLowerCase() === nombre);
    if( marcasXnombre.length > 0){
        response.status(200).json({data: marcasXnombre});
    } else {
        response.status(404).json({msg: 'Marca no encontrada'});
    }
}

export { newMarca, listMarcas, getMarcaById, deleteMarcaById, updateMarcaById, getMarcaByNombre };