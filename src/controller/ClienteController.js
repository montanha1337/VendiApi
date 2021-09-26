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
    const token1=req.body.token
    var validacpf =  await Funcao.validacpf(data["cpf"])
    if(validacpf == true){
        const token = Funcao.atualizajwt(token1) 
        if(token== false){
            res.status(401).json({'token':'Nao foi possivel indentificar o usuario'})
        }else{
            const verificacliente = await Consulta.pessoacpf(token)
            if(data["cpf"] == verificacliente){        
                const result = await Consulta.cliente(token)
                res.status(200).json({token,result})
            }else{
                const cliente=await Cadastro.cliente(token, data)
                if(cliente == false){
                    const err = "token invalido"
                    res.status(401).json({err})
                }else{       
                    const result = await Consulta.cliente(token)
                    res.status(200).json({token,result})
                }
            }   
        }
    }else{
        res.status(401).json("CPF invalido")
    }
})
router.get('/buscar', async (req, res, ) => {
    
    const token1=req.body.token
    const token = Funcao.atualizajwt(token1) 
    if(token== false){
        res.status(401).json({'token':'Nao foi possivel indentificar o usuario'})
    }else{
        const result = await Consulta.cliente(token)
        res.status(200).json({token,result})
    }
    
})

module.exports = router