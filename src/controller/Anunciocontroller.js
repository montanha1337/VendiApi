import express from 'express'
import Funcao from './functions'
import Banco from '../Banco/connect'
import multer from 'multer'

const parser = multer({ dest: 'uploads' })

const router = express.Router()

// Rota para Login

router.post('/imagem', async (req, res, ) => {
        parser.single('imagem')(req, res, err => {
            if (err)
                res.status(500).json({ error: 1, payload: err });
            else {
                var image = new Object()
                image.id = req.file
                image.url = image.id.path
                
            res.status(200).json({ error: 0, payload: { nome: image.id.originalname, url: image.url } });
        }
    })
})
router.get('/imagem', async (req, res, ) => {
    
})



module.exports = router