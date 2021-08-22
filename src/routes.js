import { Router } from 'express';
import Teste from './controller/teste'

const routes = new Router();

routes.use('/teste',Teste)



module.exports = routes;