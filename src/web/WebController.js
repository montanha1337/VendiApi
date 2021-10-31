import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    res.sendFile(__dirname+'/controller/web/PaginaInicial.html')
});
router.get('/redefinirSenha', async (req, res, next) => {
    res.sendFile(__dirname+'/web/recuperarsenha.html')
})
router.get('/buscar/', async (req, res,) => {

})
router.get('/deletar/', async (req, res,) => {
  
})
router.get('/deletarfoto/', async (req, res,) => {
 
})



module.exports = router