import Producto from '../models/ProductoModel.js'

const newProducto = async( request, response ) =>{
    const {nombre, marca, descripcion, ingredientes} = request.body;
    const producto = new Producto({nombre, marca, descripcion, ingredientes});
    const data = await producto.save();
    response.status(201).json({ msg:"producto creado", data});
}

const listProductos = async (request, response) =>{
    const productos = await Producto.find();
    response.json(productos);
}

const getProductoById = async (request, response) => {
    const id = request.params.id;
    const producto = await Producto.findById(id);
    if( producto){
        response.status(200).json({data: producto});
    } else {
        response.status(404).json({msg: 'producto no encontrado'});
    }
}

const deleteProductoById = async( request, response) =>{
    const id = request.params.id;
    const producto = await Producto.findByIdAndDelete(id);
    if ( producto ){
        response.status(200).json({msg:'Producto Eliminado'});
    } else {
        response.status(404).json({msg: 'Producto no encontrado'});
    }
}

const updateProductoById = async( request, response) =>{
    const id = request.params.id;
    const body = request.body;

    const producto = await Producto.findByIdAndUpdate(id, body);
    if ( producto ){
        response.status(200).json({msg:'Producto Actualizado'});
    } else {
        response.status(404).json({msg: 'Producto no encontrado'});
    }
}

const getProductoByNombre = async (request, response) => {
    const nombre = request.params.nombre.trim().toLowerCase();
    const productos = await Producto.find();
    const productosXnombre = productos.filter(c => c.nombre.toLowerCase() === nombre);
    if( productosXnombre.length > 0){
        response.status(200).json({data: productosXnombre});
    } else {
        response.status(404).json({msg: 'producto no encontrada'});
    }
}

export { newProducto, listProductos, getProductoById, deleteProductoById, updateProductoById, getProductoByNombre };