import Banco from '../connect'
import Funcoes from '../../controller/functions'

async function vendedor() {
    const user     = Funcoes.verificajwt(token)
    const banco    = await Banco.session()
    const vendedor = banco.query('',[user])
    if(vendedor){
      return vendedor
    }
  }


module.exports = {vendedor}