import Banco from '../connect'
import Funcoes from '../../controller/functions'

async function vendedor(token) {
    const user     = Funcoes.verificajwt(token)
    if(user== false){
      return false
    }else{
      const banco    = await Banco.session()
      const vendedor = await banco.query('select v.id_vendedor,u.nome, p.cpf, t.telefone, v.classificacao, e.cidade from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
      if(vendedor.rows[0])
        return vendedor.rows[0]
      return false
    }
  }
  async function cliente(token) {
    const user     = Funcoes.verificajwt(token)
    if(user== false){
      return false
    }else{
      const banco    = await Banco.session()
      const cliente = await banco.query('select u.nome, p.cpf, t.telefone, e.cidade from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
      if(cliente.rows[0])
        return cliente.rows[0]
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
    const categoria = await banco.query('select c.id_categoria, c.descricao from Vendi.categoria c')
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
        return json
      }
      return false
    }
  }
  async function anuncio(categoria,pagina) {
      const banco    = await Banco.session()
      const anuncio = await banco.query('select a.id_anuncio,u.nome as vendedor, e.cidade,a.id_categoria, a.titulo, a.descricao, a.valor, a.dataanuncio, f.linkfoto from Vendi.anuncio a left outer join Vendi.vendedor v on v.id_vendedor= a.id_vendedor left outer join Vendi.pessoa p on p.id_pessoa= v.id_pessoa left outer join Vendi.endereco e on e.id_pessoa = v.id_pessoa left outer join Vendi.user   u   on u.id_user = p.id_user left outer join Vendi.foto f on f.id_anuncio = a.id_anuncio where a.id_categoria = $1 LIMIT 10 OFFSET($2 - 1) * 10',[categoria,pagina])
      if(anuncio.rows[0]){
          return anuncio.rows
        }
        return false
    
  }
  async function anuncioLista(idAnuncio) {
    const banco    = await Banco.session()
    const anuncio = await banco.query('select a.id_anuncio,u.nome as vendedor, e.cidade,a.id_categoria, a.titulo, a.descricao, a.valor, a.dataanuncio, f.linkfoto from Vendi.anuncio a left outer join Vendi.vendedor v on v.id_vendedor= a.id_vendedor left outer join Vendi.pessoa p on p.id_pessoa= v.id_pessoa left outer join Vendi.endereco e on e.id_pessoa = v.id_pessoa left outer join Vendi.user   u   on u.id_user = p.id_user left outer join Vendi.foto f on f.id_anuncio = a.id_anuncio where a.id_anuncio = $1 ',[idAnuncio])
    if(anuncio.rows[0]){
        return anuncio.rows
      }
      return false
  
}
  


module.exports = {vendedor,cliente, pessoacpf, categoria,  perfil, anuncio, anuncioLista}