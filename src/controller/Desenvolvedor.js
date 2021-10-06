import express  from  'express'
import Banco    from  '../Banco/connect'
import Funcao   from  './functions'
import Database from  '../Banco/migrations/database'
import Editar from '../Banco/migrations/editar'

const router = express.Router()


 // rota de teste servidor
 router.get('/testeServer',(req,res)=>{
    const descricao ='Acessado backend!!!'
    res.json({descricao})
  })

// rota de teste banco de dados
router.get('/testeConexaoBanco', async (req, res, ) => {
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
 router.get('/deletaBanco',async(req,res)=>{
  const banco= await Banco.session()
  const result = await banco.query("SELECT count(nspname) FROM pg_catalog.pg_namespace;")

  if(result.rows[0].count==7){
    const conexao =await Funcao.verificaconexao(3)
    Database.deletaschema()
    res.json(conexao)
  }else{
  }
})
router.get('/testeToken', async (req, res, ) => {
  const Bearer = req.body.token
  const id= Funcao.verificajwt(Bearer) 
  res.json(id)
})


router.get('/AtualizaToken',async(req,res)=>{
  const atualizatoken = req.headers.authorization.replace(/^Bearer\s/, '');
  const token = await Funcao.atualizajwt(atualizatoken)
 if(token== false){
  res.status(401).json({token:[]})
}
res.status(200).json({token})
})
//testa o envio de email
router.get('/enviaEmail',async(req,res)=>{
      const nome = req.body.assunto;
      const email = req.body.email;
      const mensagem = req.body.texto;
      
     const enviarEmail = Funcao.enviaremail(email, nome,mensagem)
     res.status(200).json({enviarEmail})

  })
  router.get('/testeStringBanco', async (req, res, ) => {
  const tabela = req.body.tabela
  const campo = req.body.campo
  const valor = req.body.valor
  const campoBusca = req.body.campoBusca
  const valorBusca = req.body.valorBusca  
  const result= await Editar.updateTable(tabela,campo,valor,campoBusca, valorBusca)
  res.status(200).json(result)

})
module.exports = router