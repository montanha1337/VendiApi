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
    data.classificacaoVendedor= 1
    const token1=req.body.token
    var validacpf =  await Funcao.validacpf(data["cpf"])
    if(validacpf == true){
        const token = Funcao.atualizajwt(token1) 
        if(token== false){
            res.status(401).json({'token':'Nao foi possivel indentificar o usuario'})
        }else{
            const verificaVendedor = await Consulta.pessoacpf(token)
            if(data["cpf"] == verificaVendedor){        
                const result = await Consulta.vendedor(token)
                res.status(200).json({token,result})
            }else{
                const vendedor=await Cadastro.vendedor(token, data)
                if(vendedor == false){
                    const err = "token invalido"
                    res.status(401).json({err})
                }else{       
                    const result = await Consulta.vendedor(token)
                    res.status(200).json({token,result})
                }
            }   
        }
    }else{
        res.status(401).json("CPF invalido")
    }
})

module.exports = router