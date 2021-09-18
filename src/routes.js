import { Router } from 'express';
import Dev from './controller/Desenvolvedor'
import User from './controller/Sessioncontroller'
import Vendedor from './controller/Vendedorcontroller'

const routes = new Router();
//olhar o final da rota em ./controller/Desenvolvedor


routes.use('/desenvolvimento',Dev) //Rota com ferramentas para auxiliar o frontend e demais areas
routes.use('/user',User)           //Rota para manipulação de usuario
routes.use('/vendedor',Vendedor)           //Rota para manipulação de Vendedor



module.exports = routes;