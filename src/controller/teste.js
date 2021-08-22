import express from 'express'
import Banco from '../Banco/connect'

const router = express.Router()


 // rota de teste
 router.get('/server',(req,res)=>{
    res.json('Acessado backend!!!')
  })
router.get('/banco', async (req, res, ) => {
    const teste=Banco.testaconexao()
    if(teste){
        res.json ('Banco Acessado')
    }
    else{
        res.jason(teste.err)
    }
})




module.exports = router