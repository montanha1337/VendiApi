import { Router } from 'express';
import Dev from './controller/Desenvolvedor'
import User from './controller/Sessioncontroller'
import Vendedor from './controller/Vendedorcontroller'
import Anuncio from './controller/Anunciocontroller'
import Home from './controller/HomeController'
import Cliente from './controller/Clientecontroller'

const routes = new Router();
//olhar o final da rota 


routes.use('/desenvolvimento',Dev) //Rota com ferramentas para auxiliar o frontend e demais areas
routes.use('/user',User)           //Rota para manipulação de usuario
routes.use('/vendedor',Vendedor)           //Rota para manipulação de Vendedor
routes.use('/anuncio',Anuncio)           //Rota para manipulação de Anuncio
routes.use('/home',Home)           //Rota para manipulação de Home
routes.use('/cliente',Cliente)           //Rota para manipulação de Cliente



module.exports = routes;