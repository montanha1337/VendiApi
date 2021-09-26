import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'

const router = express.Router()

router.get('/categoria', async (req, res, ) => {
    const { token } = req.params
    const categoria = await Consulta.categoria()
    if(categoria== false){
        res.status(401).json('ocorreu um erro ao buscar dados, verifique o banco de dados.')
    }else{
        res.status(200).json({categoria})
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
router.get('/anuncio/:categoria/:pagina', async (req, res, ) => {
    const { categoria } = req.params
    const { pagina } = req.params
    const anuncio = await Consulta.anuncio(categoria,pagina)
    if(anuncio== false){
        res.status(401).json('ocorreu um erro ao buscar dados, verifique o banco de dados.')
    }else{
        res.status(200).json({anuncio})
    }
})
//[ ]  classificar anuncio, (via banco) 
//[ ]  editar vendedores,
//[ ]  editar comprador,
//[ ]  editar anuncio,
//[ ]  buscar por vendedor anuncio,
//[ ]  colocar barrer token colocar as rotas de edição,
//[ ]  api de fotos

module.exports = router