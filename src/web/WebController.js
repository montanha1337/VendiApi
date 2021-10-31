import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    res.sendFile(__dirname+'/controller/web/PaginaInicial.html')
});
router.post('/redefinirSenha', async (req, res, next) => {
    res.sendFile(__dirname+'/web/PaginaInicial.html')
})
router.get('/buscar/', async (req, res,) => {

})
router.delete('/deletar/', async (req, res,) => {
  
})
router.delete('/deletarfoto/', async (req, res,) => {
 
})



module.exports = router