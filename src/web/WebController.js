import express from 'express'

const router = express.Router()
const caminho = __dirname

router.get('/', async (req, res) => {
    res.sendFile(caminho+'/PaginaInicial.html')
});
router.get('/redefinirSenha/:token', async (req, res, next) => {
    res.sendFile(caminho+'/recuperarsenha.html')
})
router.get('/login', async (req, res,) => {
    res.sendFile(caminho+ '/login.html')
})
router.get('/home', async (req, res,) => {
    res.sendFile(caminho+ '/home.html')
})
router.get('/deletarfoto/', async (req, res,) => {
    res.sendFile(caminho+ '')
})



module.exports = router