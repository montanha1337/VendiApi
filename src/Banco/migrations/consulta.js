import Banco from '../connect'
import Funcoes from '../../controller/functions'

async function vendedor(token) {
    const user     = Funcoes.verificajwt(token)
    const banco    = await Banco.session()
    const vendedor = await banco.query('select u.nome, p.cpf, t.telefone, v.classificacao, e.cidade from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
    if(vendedor.rows[0])
      return vendedor.rows[0]
    return 'Error'
  }


module.exports = {vendedor,}