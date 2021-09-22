import Banco from '../connect'
import Funcoes from '../../controller/functions'

async function vendedor(token) {
    const user     = Funcoes.verificajwt(token)
    if(user== false){
      return false
    }else{
      const banco    = await Banco.session()
      const vendedor = await banco.query('select u.nome, p.cpf, t.telefone, v.classificacao, e.cidade from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
      if(vendedor.rows[0])
        return vendedor.rows[0]
      return false
    }
  }
  async function pessoacpf(token) {
    const user     = Funcoes.verificajwt(token)
    if(user== false){
      return false
    }else{
      const banco    = await Banco.session()
      const pessoa = await banco.query('select p.cpf from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
      if(pessoa.rows[0])
        return pessoa.rows[0].cpf
      return false
    }
  }
  async function categoria() {
    const banco    = await Banco.session()
    const categoria = await banco.query('select c.descricao from Vendi.categoria c')
    if(categoria.rows[0]){
    var json= new Object()
    json.categoria= categoria.rows
      return json.categoria
    }
    return false
  }
  async function perfil(token) {
    const user     = Funcoes.verificajwt(token)
    if(user== false){
      return false
    }else{
      const banco    = await Banco.session()
      const pessoa = await banco.query('select u.nome, u.linkfoto from Vendi.user u where u.id_user = $1 ',[user])
      if(pessoa.rows[0]){
        var json = new Object()
        json.nome=pessoa.rows[0].nome
        json.foto= pessoa.rows[0].linkfoto
        
        console.log(json)

        return json
      }
      return false
    }
  }


module.exports = {vendedor, pessoacpf, categoria,  perfil}