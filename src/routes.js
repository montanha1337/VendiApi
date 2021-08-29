import { Router } from 'express';
import Teste from './controller/teste'
import User from './controller/Sessioncontroller'

const routes = new Router();

routes.use('/desenvolvimento',Teste)
routes.use('/user',User)



module.exports = routes;