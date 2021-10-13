import Banco from '../connect'
import Funcoes from '../../controller/functions'
import Consulta from './consulta'

async function vendedor(token) {
    const user     = await Consulta.verificaUser(token)
    if(user.status== false){
      return user
    }else{
        var vendedor = await Consulta.vendedor(token)
        if(vendedor.status== false){
            return vendedor
        }else{
            if(vendedor.id_vendedor== null){
                const erro = Funcoes.padraoErro("Vendedor não encontrado")
                return erro
            }else{
                const banco    = await Banco.session()
                const pessoa = await banco.query("select id_pessoa from Vendi.vendedor where id_vendedor = $1",[vendedor.id_vendedor])
                vendedor.id_pessoa = pessoa.rows[0].id_pessoa
                var n = await banco.query('select count(f.id_anuncio) as vx from Vendi.anuncio a left outer join Vendi.foto f on f.id_anuncio = a.id_anuncio where a.id_vendedor = $1', [ vendedor.id_vendedor])
                var anuncio = await banco.query('select linkfoto, a.id_anuncio, f.id_foto from Vendi.anuncio a left outer join Vendi.foto f on f.id_anuncio = a.id_anuncio where a.id_vendedor = $1', [ vendedor.id_vendedor])
                for (var i = 0; i < n.rows[0].vx; i++) {
                    await banco.query("select id_pessoa from Vendi.vendedor where id_vendedor = $1",[vendedor.id_vendedor]) 
                    var foto = await banco.query('select linkfoto from Vendi.anuncio a left outer join Vendi.foto f on f.id_anuncio = a.id_anuncio where f.id_foto = $1', [anuncio.rows[i].id_foto ])
                    await banco.query("delete from Vendi.foto where id_anuncio = $1",[anuncio.rows[i].id_anuncio])
                    await Funcoes.deletaFoto(`${process.cwd()}/uploads/anuncio/${foto.rows[0].linkfoto.substring(38)}`)
                }
                await banco.query("delete from Vendi.anuncio where id_vendedor = $1;",[vendedor.id_vendedor])
                await banco.query("delete from Vendi.vendedor where id_vendedor = $1;",[vendedor.id_vendedor])
                await cliente(token)
                vendedor.status = 'Deletado'
                return vendedor
            }
        }
    }
}
async function cliente(token) {
    const user     = await Consulta.verificaUser(token)
    if(user.status== false){
      return user
    }else{
        var cliente = await Consulta.cliente(token)
        if(cliente.status== false){
            return cliente
        }else{
            if(cliente.id_pessoa== null){
                const erro = Funcoes.padraoErro("Cliente não existe!!!")
                return erro
            }else{
                const banco    = await Banco.session()
                await banco.query("delete from Vendi.endereco where id_pessoa = $1",[cliente.id_pessoa])
                await banco.query("delete from Vendi.telefone where id_pessoa = $1",[cliente.id_pessoa])
                await banco.query("delete from Vendi.pessoa where id_pessoa = $1",[cliente.id_pessoa])
                cliente.status = 'Deletado'
                return cliente
            }
        }
    }
}

async function user(token) {
    const user     = await Consulta.verificaUser(token)
    if(user.status== false){
      return user
    }else{

    }
}
async function anuncio(id,token) {
  const vendedor = await Consulta.validaVendedor(token)
  if(vendedor.status== false){
    const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
    return erro
  }else{
  const banco    = await Banco.session()
  var foto = await banco.query('select linkfoto from Vendi.foto where id_anuncio =$1', [id])
  var anuncio = await banco.query("delete from Vendi.foto where id_anuncio = $1",[id])
  foto = await Funcoes.deletaFoto(`${process.cwd()}/uploads/anuncio/${foto.rows[0].linkfoto.substring(38)}`)
  anuncio = await banco.query("delete from Vendi.anuncio where id_anuncio = $1;",[id])
  return true
  }
}


module.exports = { vendedor, user, cliente, anuncio}