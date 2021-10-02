import express from 'express'
import Funcao from './functions'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'
import Editar from '../Banco/migrations/editar'


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
    const token1=req.headers.authorization.replace(/^Bearer\s/, '');
    const token = Funcao.atualizajwt(token1) 
    const verificaCpf = await Consulta.selectTable('pessoa','cpf','cpf', data['cpf'])
    const verificUser = await Consulta.verificaUser(token)
    if(token.status == false){
        console.log(token.mensagem)
        res.status(401).json({token:null,result:null})
    }else{
    if(verificaCpf.status == false){
        var validacpf =  await Funcao.validacpf(data["cpf"])
        if(validacpf == true){
            if(token.status == false){
                console.log(token.mensagem)
                res.status(401).json({token:null,result:null})
            }else{
                const verificaCliente = await Consulta.pessoacpf(token)
                if(verificaCliente.status == false){
                    const cliente= await Cadastro.cliente(token, data)
                    if(cliente.status == false){
                        console.log(cliente.mensagem)
                        res.status(401).json({token:null,result:null})
                    }else{       
                        const result = await Consulta.cliente(token)
                        if(result.status == false){
                            console.log(result.mensagem)
                            res.status(401).json({token:null,result:null})
                        }else{  
                            res.status(200).json({token,result})
                        }
                    }
                }else{
                    if(data["cpf"] == verificaCliente){        
                        const result = await Consulta.cliente(token)
                        res.status(200).json({token,result})
                    }else{
                        console.log('Cpf não vinculado ao cliente. Verifique por favor.')
                        res.status(200).json({token:null,result:null})
                    }
                }   
            }
        }else{
            console.log('CPF invalido')
            res.status(401).json({token:null,result:null})     
        }
    }else{
        const result = await Consulta.cliente(token)
        if(result.status == false){
            console.log('Cpf já cadastrado!!')
            console.log(result.mensagem)
            res.status(401).json({token:null,result:null})
        }else{  
            res.status(200).json({token,result})
        }
    }
}
})
router.get('/buscar', async (req, res, ) => {
    
    const token1=req.headers.authorization.replace(/^Bearer\s/, '');
    const token = Funcao.atualizajwt(token1) 
    if(token.status == false){
        console.log(anuncio.mensagem)
        res.status(401).json({token:null,result:null})
    }else{
        const result = await Consulta.cliente(token)
        res.status(200).json({token,result})
    }
    
})
router.post('/editar', async (req, res, ) => {
    var data = new Object()
    data.nome = req.body.nome
    data.cpf=req.body.cpf
    data.telefone=req.body.telefone
    data.whatsapp=req.body.whatsapp
    data.rua=req.body.rua
    data.bairro=req.body.bairro
    data.cidade=req.body.cidade
    data.numero=req.body.numero
    data.cep=req.body.cep
    const token1=req.headers.authorization.replace(/^Bearer\s/, '');
    const token = Funcao.atualizajwt(token1)
    if(token.status == false){
        console.log(token.mensagem)
        res.status(401).json({token:null,result:null})
    }else{
        const compare = await Consulta.cliente(token)
        var result = await Editar.atualizaCliente('pessoa','cpf',data['cpf'],compare.cpf)
        result  = await Editar.atualizaCliente('user','nome',data['nome'],compare.nome)
        result  = await Editar.atualizaCliente('telefone','telefone',data['telefone'],compare.telefone)
        result = await Editar.atualizaCliente('telefone','whatsapp',data['whatsapp'],compare.whatsapp)
        result = await Editar.atualizaCliente('endereco','rua',data['rua'],compare.rua)
        result = await Editar.atualizaCliente('endereco','bairro',data['bairro'],compare.bairro)
        result = await Editar.atualizaCliente('endereco','cidade',data['cidade'],compare.cidade)
        result = await Editar.atualizaCliente('endereco','numero',data['numero'],compare.numero)
        result = await Editar.atualizaCliente('endereco','cep',data['cep'],compare.cep)
        result = await Consulta.cliente(token)
        res.status(200).json({token,result})
    }
})

module.exports = router