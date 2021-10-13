import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'
import Delete from '../Banco/migrations/deletar'
import multer from 'multer'
import fs       from 'fs'

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
    var filepath = `${process.cwd()}/uploads/anuncio/${id}`
        res.status(200).sendFile(filepath)
});
router.post('/inserir', parser.single('imagem'), async (req, res, next) => {

    var anuncio = Object()
    anuncio.file = req.file
    anuncio.categoria = req.body.categoria
    anuncio.titulo = req.body.titulo
    anuncio.descricao = req.body.descricao
    anuncio.valor = req.body.valorVenda
    anuncio.classificacao = req.body.classificacao
    anuncio.data = new Date();
    const token1 = req.headers.authorization.replace(/^Bearer\s/, '');
    const token = Funcao.atualizajwt(token1)
    if (token.status == false) {
        console.log(anuncio.mensagem)
        res.status(401).json({ token: null })
    } else {
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
router.delete('/deletar/:id', async (req, res,) => {
    const tokenVenda = req.headers.authorization.replace(/^Bearer\s/, '')
    const { id } = req.params
    const anuncio = await Delete.anuncio(id, tokenVenda)
    if (anuncio.status == false) {
        console.log(anuncio.mensagem)
        res.status(200).json({ anuncio: [] })
    } else {
        res.status(200).json({ anuncio })
    }

})
router.delete('/deletarfoto/:id', async (req, res,) => {
    const idfoto = req.params.id
    var foto = await Consulta.selectTable('foto','linkfoto','id_foto', idfoto)
    var teste = foto.linkfoto.substring(38)
    console.log(`${process.cwd()}/uploads/anuncio/${foto.linkfoto.substring(38)}`)
    res.json(teste)
})



module.exports = router