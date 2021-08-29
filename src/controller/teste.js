import express from 'express'
import Banco from '../Banco/connect'

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
        text: 'Select descricao from Login.Conexao',
      })
    if(result){      
        res.json ("status: " + result.rows)
    }
    else{
        res.jason("Erro: "+ banco.err)
    }
})

 // rota de atualização de banco de dados.
router.get('/atualizabanco',(req,res)=>{
  
})




module.exports = router