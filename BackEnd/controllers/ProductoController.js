import Producto from '../models/ProductoModel.js'

<<<<<<< HEAD
const newProducto = async (request, response) => {
    const { nombre, marca, tipo, descripcion, tags, activos, formula } = request.body;
    // Validar que la marca exista
    if (!marca) {
        return response.status(400).json({ msg: "La marca es obligatoria" });
    }
    // Opcional: validar que el ObjectId sea válido y exista
    const Marca = (await import('../models/MarcaModel.js')).default;
    const marcaObj = await Marca.findById(marca);
    if (!marcaObj) {
        return response.status(404).json({ msg: "Marca no encontrada" });
    }
    const producto = new Producto({ nombre, marca, tipo, descripcion, tags, activos, formula });
    const data = await producto.save();
    response.status(201).json({ msg: "producto creado", data });
}

const listProductos = async (request, response) => {
    // Paginación y filtro por nombre o marca
    const { page = 1, limit = 10, nombre, marca } = request.query;
    const query = {};
    if (nombre) {
        query.nombre = { $regex: nombre, $options: 'i' };
    }
    if (marca) {
        query.marca = marca;
    }
    const productos = await Producto.find(query)
        .populate('marca')
        .skip((page - 1) * limit)
        .limit(Number(limit));
    const total = await Producto.countDocuments(query);
    response.json({ total, page: Number(page), limit: Number(limit), data: productos });
=======
const newProducto = async( request, response ) =>{
    const {nombre, marca, tipo, descripcion, tags, activos, formula} = request.body;
    const producto = new Producto({nombre, marca, tipo, descripcion, tags, activos, formula});
    const data = await producto.save();
    response.status(201).json({ msg:"producto creado", data});
}

const listProductos = async (request, response) =>{
    const productos = await Producto.find();
    response.json(productos);
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
}

const getProductoById = async (request, response) => {
    const id = request.params.id;
<<<<<<< HEAD
    const producto = await Producto.findById(id).populate('marca');
    if (producto) {
        response.status(200).json({ data: producto });
    } else {
        response.status(404).json({ msg: 'producto no encontrado' });
=======
    const producto = await Producto.findById(id);
    if( producto){
        response.status(200).json({data: producto});
    } else {
        response.status(404).json({msg: 'producto no encontrado'});
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
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

<<<<<<< HEAD
const updateProductoById = async (request, response) => {
    const id = request.params.id;
    const body = request.body;
    // Si se actualiza la marca, validar que exista
    if (body.marca) {
        const Marca = (await import('../models/MarcaModel.js')).default;
        const marcaObj = await Marca.findById(body.marca);
        if (!marcaObj) {
            return response.status(404).json({ msg: "Marca no encontrada" });
        }
    }
    const producto = await Producto.findByIdAndUpdate(id, body, { new: true }).populate('marca');
    if (producto) {
        response.status(200).json({ msg: 'Producto Actualizado', data: producto });
    } else {
        response.status(404).json({ msg: 'Producto no encontrado' });
=======
const updateProductoById = async( request, response) =>{
    const id = request.params.id;
    const body = request.body;

    const producto = await Producto.findByIdAndUpdate(id, body);
    if ( producto ){
        response.status(200).json({msg:'Producto Actualizado'});
    } else {
        response.status(404).json({msg: 'Producto no encontrado'});
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
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