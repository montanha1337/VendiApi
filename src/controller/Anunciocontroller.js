import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'
import multer from 'multer'

const parser = multer({ dest: 'uploads/anuncio' })

const router = express.Router()
router.post('/inserir',parser.single('imagem'), async (req, res,next ) => {
    
    var anuncio       = Object()
    anuncio.file      = req.file
    anuncio.categoria = req.body.categoria
    anuncio.titulo    = req.body.titulo
    anuncio.descricao = req.body.descricao
    anuncio.valor     = req.body.valorVenda
    anuncio.data      = new Date();
    const token1 = req.body.token
    const token = Funcao.atualizajwt(token1) 
    if(token== false){
        res.status(401).json({'token':'Nao foi possivel indentificar o usuario'})
    }else{
        const idAnuncio = await Cadastro.anuncio(token,anuncio)
        if(idAnuncio== false){
            res.status(200).json({token,idAnuncio:[]})
        }
        res.status(200).json({token,idAnuncio})
    }
})
router.get('/buscar/:id', async (req, res, ) => {
        const { id } = req.params
        const anuncio = await Consulta.anuncioLista(id)
        if(anuncio== false){
            res.status(200).json({anuncio:[]})
        }
        res.status(200).json({anuncio})
    
})




module.exports = router