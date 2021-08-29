import express from 'express'
import Funcao from './functions'
import Banco from '../Banco/connect'

const router = express.Router()


router.post('/login', async (req, res, ) => {
    const email = req.body.email
    const senha = req.body.password

    const banco= await Banco.session()
    const iduser = await banco.query({
        text: 'Select id_user from Login.user',
      })
    if(email=='teste@teste.com' && senha=='teste'){
       const token= Funcao.gerajwt(iduser.rows)

        res.status(201).json('token: ' + token)
    }
})
router.get('/testeconexao', async (req, res, ) => {
    const token = req.body.token
    const id= Funcao.verificajwt(token) 
    res.json(id)
})
router.put('/', async (req, res, ) => {})
router.delete('/', async (req, res, ) => {})





module.exports = router