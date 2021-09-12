import Banco from '../connect'
import Funcoes from '../../controller/functions'

async function vendedor(token) {
    const user     = Funcoes.verificajwt(token)
    const banco    = await Banco.session()
    const vendedor = banco.query('select u.nome, pes.cpf, tel.telefone, vend.classificacao, ende.cidade from Vendi.vendedor vend inner join Vendi.pessoa pes on pes.id_pessoa= vend.id_pessoa inner join Vendi.user u on u.id_user=pes.id_user inner join Vendi.telefone tel on tel.id_pessoa= pes.id_pessoa inner join Vendi.endereco ende on ende.id_pessoa= pes.id_pessoa where u.id_user=$1',[user])
    if(vendedor){
      return vendedor
    }
  }


module.exports = {vendedor}