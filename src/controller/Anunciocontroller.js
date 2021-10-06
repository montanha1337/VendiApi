import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'
import multer from 'multer'
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdir('./uploads/anuncio', (err) => {
            cb(null, './uploads/anuncio');
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})


const parser = multer({ storage: storage })
const router = express.Router()

router.get('/uploads/:id', async (req, res) => {
    var { id } = req.params
    var filepath = await Consulta.fotoAnuncio(id)
    if (filepath.status == false) {
        console.log(filepath.mensagem)
       res.status(401).json({ filepath: null })
    } else {
        res.status(200).sendFile(filepath)
    }
});
router.post('/inserir', parser.single('imagem'), async (req, res, next) => {

    var anuncio = Object()
    anuncio.file = req.file
    anuncio.categoria = req.body.categoria
    anuncio.titulo = req.body.titulo
    anuncio.descricao = req.body.descricao
    anuncio.valor = req.body.valorVenda
    anuncio.data = new Date();
    const token1 = req.headers.authorization.replace(/^Bearer\s/, '');
    const token = Funcao.atualizajwt(token1)
    if (token.status == false) {
        console.log(anuncio.mensagem)
        res.status(401).json({ token: null })
    } else {
        console.log(anuncio.file)
        const idAnuncio = await Cadastro.anuncio(token, anuncio)
        if (idAnuncio.status == false) {
            console.log(idAnuncio.mensagem)
            res.status(200).json({ token: null, idAnuncio: null })
        } else {
            res.status(200).json({ token, idAnuncio })

        }
    }
})
router.get('/buscar/:id', async (req, res,) => {

    const { id } = req.params
    const anuncio = await Consulta.anuncioLista(id)
    if (anuncio.status == false) {
        console.log(anuncio.mensagem)
        res.status(200).json({ anuncio: [] })
    } else {
        res.status(200).json({ anuncio })
    }

})
router.get('/deletar/:id', async (req, res,) => {
    const tokenVenda = req.headers.authorization.replace(/^Bearer\s/, '')
    const { id } = req.params
    const anuncio = await Cadastro.deletaAnuncio(id, tokenVenda)
    if (anuncio.status == false) {
        console.log(anuncio.mensagem)
        res.status(200).json({ anuncio: [] })
    } else {
        res.status(200).json({ anuncio })
    }

})




module.exports = router