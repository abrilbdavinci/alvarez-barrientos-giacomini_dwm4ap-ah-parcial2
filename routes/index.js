import usuarioRouter from './UsuarioRouter.js';
import capsulaRouter from './CapsulaRouter.js';
import maquinaRouter from './MaquinaRouter.js';

const routerAPI = (app) =>{
    app.use('/api/usuarios', usuarioRouter);
    app.use('/api/capsulas', capsulaRouter);
    app.use('/api/maquinas', maquinaRouter);
}

export default routerAPI;