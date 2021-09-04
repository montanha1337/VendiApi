import { Router } from 'express';
import Dev from './controller/Desenvolvedor'
import User from './controller/Sessioncontroller'

const routes = new Router();
//olhar o final da rota em ./controller/Desenvolvedor


routes.use('/desenvolvimento',Dev) //Rota com ferramentas para auxiliar o frontend e demais areas
routes.use('/user',User)           //Rota do usuario para cadastro login entre outros



module.exports = routes;