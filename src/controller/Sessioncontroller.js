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
              res.status(200).json({token})
        }else{
            res.status(401).json('Ops, Acho que você errou a senha, mas caso tenha esquecido por favor redefine-a')
        }
    }else{
        res.status(401).json('Email incorreto ou usuario inexistente')
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
              res.status(200).json({token})
        }else{
            res.status(401).json('Ops, Acho que você errou a senha, mas caso tenha esquecido por favor redefine-a')
        }
    }else{        
        const password= await Funcao.cripto(senha)
        await banco.query("INSERT INTO Vendi.user(nome,email, senha)VALUES ($1,$2,$3);",[nome,email, password])
        const iduser = await banco.query('SELECT id_user FROM Vendi.user u where u.email= $1 and u.senha= $2;',[email, password])
        if(iduser.rows[0].id_user>0){
            const token= Funcao.gerajwt(iduser.rows[0].id_user)
              res.status(200).json({token})
        }else{
            res.status(401).json("Algo de errado ao gravar o usuário!!!")
        }
    }
})
router.post('/imagem', async (req, res, ) => {
    parser.single('imagem')(req, res, err => {
        if (err)
            res.status(500).json({ error: 1, payload: err });
        else {
            var image = new Object()
            image.id = req.file
            image.url = image.id.path
            const tokenreq= req.body.token
            const token =Funcao.atualizajwt(tokenreq)
            res.status(200).json({token});
        }
    })
})
//Rota para envio de email para redefinição de senha
router.put('/enviarEmailDeRedefinicao', async (req, res, ) => {
    const nome = "Redefinição de senha";
    const email = req.body.email
    const banco= await Banco.session()
    const user = await banco.query('SELECT id_user, senha FROM Vendi.user u where u.email= $1',[email])
    if(user.rows[0]){
        const token= Funcao.gerajwtsenha(email)
        const url = ('http://localhost:8080/user/redefinirsenha/'+token)
        const recepcaoEmail=await Funcao.enviaremail(email, nome,url)   
        res.json({recepcaoEmail})
    }
})
//rota demostração tela redefinição senha.
router.get('/redefinirsenha/:token',async(req,res)=>{
res.sendFile(__dirname+"/tela/recuperarsenha.html")
})
//Rota para redefinição de senha
router.post('/redefinirSenha/:token', async (req, res, ) => {
    const { token } = req.params
    const email = Funcao.verificatokensenha(token)
    const senhanova = req.body.novaSenha
    const password= await Funcao.cripto(senhanova)
    const banco= await Banco.session()
    const user = await banco.query('SELECT id_user, senha FROM Vendi.user u where u.email= $1',[email])

    if(user.rows[0]){
        await banco.query("UPDATE vendi.user SET senha=$1 WHERE email=$2;",[password,email])
        const iduser = await banco.query('SELECT id_user FROM Vendi.user u where u.email= $1 and u.senha= $2;',[email, password])
        if(iduser.rows[0].id_user>0){
            const token= Funcao.gerajwt(iduser.rows[0].id_user)
            if(token== false){
                res.status(401).json({'token':'token invalido'})
              }
              res.status(200).json({token})
        }else{
            res.status(401).json("Algo de errado ao gravar o usuário!!!")
        }
    }else{
        res.status(401).json("email não encontrado")
    }
})
// Rota para Verificar o token

module.exports = router