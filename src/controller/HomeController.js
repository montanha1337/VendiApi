import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'

const router = express.Router()

router.get('/categoria', async (req, res, ) => {
    const categoria = await Consulta.categoria()
    if(categoria== false){
        res.status(401).json('ocorreu um erro ao buscar dados, verifique o banco de dados.')
    }else{
        res.status(201).json({categoria})
    }
})
router.post('/perfil', async (req, res, ) => {
    const tokenreq= req.body.token
    const token = Funcao.atualizajwt(tokenreq) 
    if(token== false){
        res.status(401).json({'token':'Nao foi possivel indentificar o usuario'})
    }else{
        const perfil = await Consulta.perfil(token)
        res.status(200).json({token,perfil})
    }
})
router.get('/anuncio', async (req, res, ) => {
    const anuncio = await Consulta.anuncio()
    if(anuncio== false){
        res.status(401).json('ocorreu um erro ao buscar dados, verifique o banco de dados.')
    }else{
        res.status(201).json({anuncio})
    }
})


module.exports = router