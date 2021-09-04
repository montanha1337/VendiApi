import express  from  'express'
import Banco    from  '../Banco/connect'
import Funcao   from  './functions'
import Database from  '../Banco/migrations/database'

const router = express.Router()


 // rota de teste servidor
 router.get('/testeserver',(req,res)=>{
    const descricao ='Acessado backend!!!'
    res.json({descricao})
  })

// rota de teste banco de dados
router.get('/testeconexaobanco', async (req, res, ) => {
    const banco= await Banco.session()
    const result = await banco.query("SELECT count(nspname) FROM pg_catalog.pg_namespace;")

    if(result.rows[0].count==7){
      const texto= await Funcao.verificaconexao(1)
      res.json(texto)
 
    }
    else{
      Funcao.atualizabanco()
      const conexao = await Funcao.verificaconexao(2)
      res.json(conexao)
    }
})
 // rota de deletar de banco de dados.
 router.get('/deletabanco',async(req,res)=>{
  const banco= await Banco.session()
  const result = await banco.query("SELECT count(nspname) FROM pg_catalog.pg_namespace;")

  if(result.rows[0].count==7){
    const conexao =await Funcao.verificaconexao(3)
    Database.deletaschema()
    res.json(conexao)
  }else{
  }
})
//testa o envio de email
router.get('/enviaemail',async(req,res)=>{
      const nome = req.body.Assunto;
      const email = req.body.email;
      const mensagem = req.body.Texto;
      
     const enviaremail = Funcao.enviaremail(email, nome,mensagem)
     res.json('Email enviado')

  })
module.exports = router