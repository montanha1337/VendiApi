import Banco from '../connect'
import Funcoes from '../../controller/functions'

async function verificaUser(token) {
  const iduser     = Funcoes.verificajwt(token)
  if(iduser== false){
    const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
    return erro
  }else{
    const banco    = await Banco.session()
    const user = await banco.query('select * from Vendi.user u where  u.id_user = $1',[iduser])
    if(user.rows[0]){
      return user.rows[0].id_user
    }
    const erro = Funcoes.padraoErro("usuario nao encontrado na base de dados")
    return erro
  }

}
async function vendedor(token) {
    const user     = await verificaUser(token)
    
    if(user.status== false){
      const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
      return erro
    }else{
      
      const banco    = await Banco.session()
      const vendedor = await banco.query('select v.id_vendedor, u.nome, p.cpf, t.telefone, e.cidade, t.whatsapp, e.rua, e.bairro, e.cidade, e.numero, e.cep, v.classificacao from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
      if(vendedor.rows[0]){
        return vendedor.rows[0]
      }
      const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
      return erro
    }
  }
  async function cliente(token) {
    const user     = await verificaUser(token)
    if(user.status== false){
      const erro = Funcoes.padraoErro("nao foi possivel identificar o usuario da requisição")
      return erro
    }else{
      const banco    = await Banco.session()
      const cliente = await banco.query('select p.id_pessoa, u.nome, p.cpf, t.telefone, e.cidade, t.whatsapp, e.rua, e.bairro, e.cidade, e.numero, e.cep  from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
      if(cliente.rows[0]){
        return cliente.rows[0]
      }
      const erro = Funcoes.padraoErro("nao foi encontrado resultados na base de dados para o Cliente")
      return erro
    }
  }
  async function pessoacpf(token,cpf) {
    var json = Object ()
    const user     = await verificaUser(token)
    if(user.status== false){
      const erro = Funcoes.padraoErro("nao foi possivel identificar o usuario da requisição")
      return erro
    }else{
      const banco    = await Banco.session()
      const pessoa = await banco.query('select p.cpf from Vendi.user u left outer join Vendi.pessoa   p on p.id_user=   u.id_user left outer join Vendi.telefone t on t.id_pessoa= p.id_pessoa left outer join Vendi.endereco e on e.id_pessoa= p.id_pessoa left outer join Vendi.vendedor v on v.id_pessoa= p.id_pessoa where u.id_user = $1 ',[user])
      if(pessoa.rows[0].cpf==null){
        json.status = true
        json.mensagem = 'CPF não encontrado'
        return json
      }else{
        if(pessoa.rows[0].cpf == cpf){
          const erro = Funcoes.padraoErro('Cpf já existe.')  
          return erro
        }else{
          json.status = true
          json.mensagem = 'CPF não pertence ao usuario.'
          return json
      }
    }
  }
}
  async function categoria() {
    const banco    = await Banco.session()
    const categoria = await banco.query('select c.id_categoria, c.descricao from Vendi.categoria c')
    if(categoria.rows[0]){
    return categoria.rows
    }
    const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
    return erro
  }

  async function perfil(token) {
    const user     = await verificaUser(token)
    if(user.status== false){
      const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
      return erro
    }else{
      const banco    = await Banco.session()
      const pessoa = await banco.query('select u.nome, u.linkfoto from Vendi.user u where u.id_user = $1 ',[user])
      if(pessoa.rows[0]){
        var json = new Object()
        json.nome=pessoa.rows[0].nome
        json.foto= pessoa.rows[0].linkfoto
        return json
      }
      const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
      return erro
    }
  }
  async function anuncio(categoria,pagina) {
      const banco    = await Banco.session()
      const anuncio = await banco.query('select a.id_anuncio,u.nome as vendedor, e.cidade,a.id_categoria, a.titulo, a.descricao, cast( a.valor as numeric) as valor, a.dataanuncio, f.linkfoto from Vendi.anuncio a left outer join Vendi.vendedor v on v.id_vendedor= a.id_vendedor left outer join Vendi.pessoa p on p.id_pessoa= v.id_pessoa left outer join Vendi.endereco e on e.id_pessoa = v.id_pessoa left outer join Vendi.user   u   on u.id_user = p.id_user left outer join Vendi.foto f on f.id_anuncio = a.id_anuncio where a.id_categoria = $1 LIMIT 10 OFFSET($2 - 1) * 10',[categoria,pagina])

      if(anuncio.rows[0]){

          return anuncio.rows
        }
        const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
        return erro
    
  }
    async function anuncioLista(idAnuncio) {
      const banco    = await Banco.session()
      const anuncio = await banco.query('select a.id_anuncio,u.nome as vendedor, e.cidade,a.id_categoria, a.titulo, a.descricao, a.valor, a.dataanuncio, f.linkfoto from Vendi.anuncio a left outer join Vendi.vendedor v on v.id_vendedor= a.id_vendedor left outer join Vendi.pessoa p on p.id_pessoa= v.id_pessoa left outer join Vendi.endereco e on e.id_pessoa = v.id_pessoa left outer join Vendi.user   u   on u.id_user = p.id_user left outer join Vendi.foto f on f.id_anuncio = a.id_anuncio where a.id_anuncio = $1 ',[idAnuncio])
      if(anuncio.rows[0]){
        var resultAnuncio = Object()
        resultAnuncio.idAnuncio= anuncio.rows[0].id_anuncio,
        resultAnuncio.vendedor= anuncio.rows[0].vendedor,
        resultAnuncio.cidade= anuncio.rows[0].cidade,
        resultAnuncio.idCategoria= anuncio.rows[0].id_categoria,
        resultAnuncio.titulo= anuncio.rows[0].titulo
        resultAnuncio.descricao= anuncio.rows[0].descricao
        resultAnuncio.valor= parseFloat(anuncio.rows[0].valor)
        resultAnuncio.dataAnuncio= anuncio.rows[0].dataanuncio,
        resultAnuncio.linkfoto= ("http://localhost:8080/anuncio/uploads/"+ anuncio.rows[0].linkfoto)
          return [resultAnuncio]
        }
        const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
        return erro
    
  }
  async function selectTable(tabela,campo,campoBusca, valorbusca) {
         var script = `select s.${campo} from Vendi.${tabela} s WHERE ${campoBusca}='${valorbusca}';`
     const banco    = await Banco.session()
     const result = await banco.query(script)
     if(result.rows[0]){
      return result.rows[0]
    }
    const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
    return erro
  }

  async function verificaVendedor(token) {
    const user     = await verificaUser(token)
    if(user.status== false){
      const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
      return erro
    }else{
      const banco    = await Banco.session()
      const vendedor = await banco.query('select id_vendedor from Vendi.user  left outer join Vendi.pessoa    on pessoa.id_user=   Vendi.user.id_user left outer join Vendi.vendedor  on vendedor.id_pessoa= pessoa.id_pessoa where Vendi.user.id_user=$1',[user])
      if(vendedor.rows[0]){
          return vendedor.rows[0]
      }
      const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
      return erro
    }
}
async function validaVendedor(token) {
  const idVendedor = Funcoes.verificajwt(token)
  var erro
  var banco
  var token
  var vendedor

  if(idVendedor== false){
    erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
    return erro
  }else{
   banco    = await Banco.session()
  var result = await banco.query('select * from Vendi.vendedor where id_vendedor=$1',[idVendedor])
  if(result.rows[0]){
    token = Funcoes.atualizajwt(token)
    vendedor = result.rows[0]
    return ({token,vendedor})
    }else{
      erro = Funcoes.padraoErro("não foi encontrado nenhum vendedor.")
      return erro
    }
  }
}

async function fotoAnuncio(linkFoto) {
  const banco    = await Banco.session()
  const anuncio = await banco.query(`select f.linkfoto from Vendi.foto f where f.linkFoto = '${linkFoto}'`)
  if(anuncio.rows[0]){
    anuncio.rows[0].linkfoto= (`${process.cwd()}/uploads/anuncio/${anuncio.rows[0].linkfoto}`)
    return anuncio.rows[0].linkfoto
  }
  const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
  return erro
}

   
  


module.exports = {vendedor,cliente, pessoacpf, categoria,  perfil, anuncio, anuncioLista, selectTable, verificaUser, verificaVendedor, validaVendedor, fotoAnuncio}