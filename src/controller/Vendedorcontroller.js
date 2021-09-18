import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'

const router = express.Router()

router.post('/Inserir', async (req, res, ) => {
    var data = new Object()
    data.cpf=req.body.cpf
    data.telefone=req.body.telefone
    data.whatsapp=req.body.whatsapp
    data.rua=req.body.rua
    data.bairro=req.body.bairro
    data.cidade=req.body.cidade
    data.numero=req.body.numero
    data.cep=req.body.cep
    data.classificacaoVendedor= req.body.classificacao
    const token1=req.body.token
    const cpf= Funcao.validacpf(data["cpf"])
    if(cpf == true){
        //await Cadastro.vendedor(token1, data)
        const token = Funcao.atualizajwt(token1)
        const result = await Consulta.vendedor(token1)
        res.status(200).json({token,result})
    }else{
        res.status(400).json('Cpf Inválido')
    }
})
module.exports = router