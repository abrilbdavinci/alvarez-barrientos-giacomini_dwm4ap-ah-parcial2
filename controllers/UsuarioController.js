import User from '../models/UsuarioModel.js'

const newUser = async( request, response ) =>{
    const {nombre, email, password} = request.body;
    const usuario = new User({nombre, email, password});
    const data = await usuario.save();
    response.status(201).json({ msg:"usuario creado", data});
}

const listUsers = async (request, response) =>{
    const usuarios = await User.find();
    response.json(usuarios);
}

const getUserById = async (request, response) => {
    const id = request.params.id;
    const user = await User.findById(id);
    if( user){
        response.status(200).json({data: user});
    } else {
        response.status(404).json({msg: 'usuario no encontrado'});
    }
}

const deleteUserById = async( request, response) =>{
    const id = request.params.id;
    const user = await User.findByIdAndDelete(id);
    if ( user ){
        response.status(200).json({msg:'Usuario Eliminado'});
    } else {
        response.status(404).json({msg: 'Usuario no encontrado'});
    }
}

const updateUserById = async( request, response) =>{
    const id = request.params.id;
    const body = request.body;

    const user = await User.findByIdAndUpdate(id, body);
    if ( user ){
        response.status(200).json({msg:'Usuario Actualizado'});
    } else {
        response.status(404).json({msg: 'Usuario no encontrado'});
    }
}

const getUserByNombre = async (request, response) => {
    const nombre = request.params.nombre.trim().toLowerCase();
    const usuarios = await User.find();
    const usuariosXnombre = usuarios.filter(u => u.nombre.toLowerCase() === nombre);
    if( usuariosXnombre.length > 0){
        response.status(200).json({data: usuariosXnombre});
    } else {
        response.status(404).json({msg: 'Usuario no encontrada'});
    }
}

export { newUser, listUsers, getUserById, deleteUserById, updateUserById , getUserByNombre };