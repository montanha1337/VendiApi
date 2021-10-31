import express from 'express'

const router = express.Router()
const caminho = __dirname

router.get('/', async (req, res) => {
    res.sendFile(caminho+'/PaginaInicial.html')
});
router.get('/redefinirSenha/:token', async (req, res, next) => {
    res.sendFile(caminho+'/recuperarsenha.html')
})
router.get('/teste', async (req, res,) => {
    res.sendFile(caminho+ '/login.html')
})
router.get('/deletar/', async (req, res,) => {
    res.sendFile(caminho+ '')
})
router.get('/deletarfoto/', async (req, res,) => {
    res.sendFile(caminho+ '')
})



module.exports = router