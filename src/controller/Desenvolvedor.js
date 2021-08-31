import express from 'express'
import Banco from '../Banco/connect'
import Funcao from './functions'
import Database from '../Banco/migrations/database'

const router = express.Router()


 // rota de teste servidor
 router.get('/testeserver',(req,res)=>{
    res.json('Acessado backend!!!')
  })

// rota de teste banco de dados
router.get('/testeconexaobanco', async (req, res, ) => {
    const banco= await Banco.session()
    const result = await banco.query({
      rowMode : 'array',
      text: "SELECT count(nspname) FROM pg_catalog.pg_namespace;",
      })

    if(result.rows==7){      
      const conexao=Funcao.verificaconexao()
      const texto = conexao
      res.json("status: Conexao Realizada")
 
    }
    else{
      Funcao.atualizabanco()
      const conexao2=Funcao.verificaconexao()
      res.json("status: Banco Atualizado")
    }
})

 // rota de atualização de banco de dados.
router.get('/atualizabanco',async(req,res)=>{
  Funcao.atualizabanco()
  res.status(201).json("Atualizado")
})

 // rota de deletar de banco de dados.
 router.get('/deletabanco',async(req,res)=>{
  Database.deletaschema()
  res.json('Schema Classifipatos Deleted')
})




module.exports = router