import express from 'express'
import Funcao from './functions'
import Banco from '../Banco/connect'

const router = express.Router()

// Rota para Login

router.post('/login', async (req, res, ) => {
    const email = req.body.email
    const senha = req.body.password    
    const banco= await Banco.session()
    const user = await banco.query('SELECT id_user, senha FROM Vendi.user u where u.email= $1',[email])
    if(user.rows[0]){
        const descript = await Funcao.compare(senha,user.rows[0].senha)        
        if(descript == true){
            const token= Funcao.gerajwt(user.rows[0].id_user)
            res.status(202).json('Token: ' + token)
        }else{
            res.json('Ops, Acho que você errou a senha, mas caso tenha esquecido por favor redefine-a')
        }
    }else{
        res.json('Email incorreto ou usuario inexistente')
    }
})
// Rota para cadastro de usuario
// lembrete caso tenha o usuario, já irá mandar o token
router.post('/cadastro', async (req, res, ) => {
    const nome  = req.body.nome
    const email = req.body.email
    const senha = req.body.password    
    const banco= await Banco.session()
    const user = await banco.query('SELECT id_user, senha FROM Vendi.user u where u.email= $1',[email])
    if(user.rows[0]){
        const descript = await Funcao.compare(senha,user.rows[0].senha)        
        if(descript == true){
            const token= Funcao.gerajwt(user.rows[0].id_user)
            res.status(202).json('Token: ' + token)
        }else{
            res.json('Ops, Acho que você errou a senha, mas caso tenha esquecido por favor redefine-a')
        }
    }else{        
        const password= await Funcao.cripto(senha)
        await banco.query("INSERT INTO Vendi.user(nome,email, senha)VALUES ($1,$2,$3);",[nome,email, password])
        const iduser = await banco.query('SELECT id_user FROM Vendi.user u where u.email= $1 and u.senha= $2;',[email, password])
        if(iduser.rows[0].id_user>0){
            const token= Funcao.gerajwt(iduser.rows[0].id_user)
            res.status(202).json('Token: ' + token)
        }else{
            res.status(401).json("Algo de errado ao gravar o usuário!!!")
        }
    }
})
//Rota para envio de email para redefinição de senha
router.put('/enviaremailderedefinicao', async (req, res, ) => {
    const nome = "Redefinição de senha";
    const email = req.body.email;
    const mensagem = req.body.urlredefinicaosenha;    
   Funcao.enviaremail(email, nome,mensagem)
   res.json('Email enviado')
})
//rota demostração tela redefinição senha.
router.get('/redefinirsenha',async(req,res)=>{
res.sendFile(__dirname+"/telasTeste/recuperarsenha.html")
})
//Rota para redefinição de senha
router.put('/redefinirsenha', async (req, res, ) => {
    const email = req.body.email
    const senhanova = req.body.atual
    const password= await Funcao.cripto(senhanova)
    const banco= await Banco.session()
    const user = await banco.query('SELECT id_user, senha FROM Vendi.user u where u.email= $1',[email])
    if(user.rows[0]){
        await banco.query("UPDATE vendi.user SET senha=$1 WHERE email=$2;",[password,email])
        const iduser = await banco.query('SELECT id_user FROM Vendi.user u where u.email= $1 and u.senha= $2;',[email, password])
        if(iduser.rows[0].id_user>0){
            const token= Funcao.gerajwt(iduser.rows[0].id_user)
            res.status(202).json('Token: ' + token)
        }else{
            res.status(401).json("Algo de errado ao gravar o usuário!!!")
        }
    }else{
        res.status(401).json("email não encontrado")
    }
})
// Rota para Verificar o token
router.get('/testeconexao', async (req, res, ) => {
    const token = req.body.token
    const id= Funcao.verificajwt(token) 
    res.json(id)
})
router.put('/', async (req, res, ) => {})
router.delete('/', async (req, res, ) => {})
module.exports = router