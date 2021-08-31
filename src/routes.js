import { Router } from 'express';
import Dev from './controller/Desenvolvedor'
import User from './controller/Sessioncontroller'

const routes = new Router();

routes.use('/desenvolvimento',Dev)
routes.use('/user',User)



module.exports = routes;