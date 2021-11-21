import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'
import Delete from '../Banco/migrations/deletar'

const router = express.Router()

router.get('/whatsapp/:id', async (req, res) => {
    const { id } = req.params
    var text = req.body.mensagem
    
    var whatsapp = await Consulta.anuncioNegocicao(id)
    text= text.replace(" ", "%20")
    res.json(`https://wa.me/55${whatsapp.telefone}?text=${whatsapp.descricao}`)
});



module.exports = router