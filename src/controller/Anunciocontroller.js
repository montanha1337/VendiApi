import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'
import multer from 'multer'
import { Token } from 'sucrase/dist/parser/tokenizer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/uploads/anuncio`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname)
    }
  })
const parser = multer({ storage: storage })
const router = express.Router()
router.post('/inserir',parser.single('imagem'), async (req, res,next ) => {
    
    var anuncio       = Object()
    anuncio.file      = req.file
    anuncio.categoria = req.body.categoria
    anuncio.titulo    = req.body.titulo
    anuncio.descricao = req.body.descricao
    anuncio.valor     = req.body.valorVenda
    anuncio.data      = new Date();
   const token1 = req.headers.authorization.replace(/^Bearer\s/, '');
    const token = Funcao.atualizajwt(token1) 
    if(token.status == false){
        console.log(anuncio.mensagem)
        res.status(401).json({token:null})
    }else{
        const idAnuncio = await Cadastro.anuncio(token,anuncio)
       if(idAnuncio.status == false){
            console.log(idAnuncio.mensagem)
           res.status(200).json({token:null,idAnuncio:null})
        }else{
            res.status(200).json({token,idAnuncio})

        }
    }
})
router.get('/buscar/:id', async (req, res, ) => {

    const { id } = req.params
    const anuncio = await Consulta.anuncioLista(id)
    if(anuncio.status == false){
        console.log(anuncio.mensagem)
        res.status(200).json({anuncio:[]})
    }else{
        res.status(200).json({anuncio})
    }
           
})
router.get('/deletar/:id', async (req, res, ) => {
    const tokenVenda = req.headers.authorization.replace(/^Bearer\s/, '')
    const { id } = req.params
    const anuncio = await Cadastro.deletaAnuncio(id,tokenVenda)
    if(anuncio.status == false){
        console.log(anuncio.mensagem)
        res.status(200).json({anuncio:[]})
    }else{
        res.status(200).json({anuncio})
    }
           
})




module.exports = router