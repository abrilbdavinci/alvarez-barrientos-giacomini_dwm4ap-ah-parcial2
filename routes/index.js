import usuarioRouter from './UsuarioRouter.js';
import productoRouter from './ProductoRouter.js';
import marcaRouter from './MarcaRouter.js';

const routerAPI = (app) =>{
    app.use('/api/usuarios', usuarioRouter);
    app.use('/api/productos', productoRouter);
    app.use('/api/marcas', marcaRouter);
}

export default routerAPI;