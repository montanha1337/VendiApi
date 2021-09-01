import express from 'express'
import Banco from '../Banco/connect'
import Funcao from './functions'
import Database from '../Banco/migrations/database'

const router = express.Router()


 // rota de teste servidor
 router.get('/testeserver',(req,res)=>{
    const descricao ='Acessado backend!!!'
    res.json([{descricao}])
  })

// rota de teste banco de dados
router.get('/testeconexaobanco', async (req, res, ) => {
    const banco= await Banco.session()
    const result = await banco.query({
      rowMode : 'array',
      text: "SELECT count(nspname) FROM pg_catalog.pg_namespace;",
      })

    if(result.rows==7){    
      const texto= await Funcao.verificaconexao(1)
      res.json(texto)
 
    }
    else{
      Funcao.atualizabanco()
      const conexao= await Funcao.verificaconexao(2)
      res.json(conexao)
    }
})

 // rota de deletar de banco de dados.
 router.get('/deletabanco',async(req,res)=>{
  const conexao =await Funcao.verificaconexao(3)
  Database.deletaschema()
  res.json(conexao)
})




module.exports = router