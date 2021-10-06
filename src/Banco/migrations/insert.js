import Banco from '../connect'
import Funcoes from '../../controller/functions'
import Consulta from './consulta'

async function vendedor(token,data) {
  var pessoa
    const user     = await Consulta.verificaUser(token)
    if(user.status== false){
      return user
    }else{
      const cpf = await Consulta.pessoacpf(token, data['cpf'])
      if(cpf.status == false){
        pessoa= await Consulta.vendedor(token)
        if(pessoa.status== false){
          return pessoa
        }else{
          return pessoa
        }
      }else{
        const banco    = await Banco.session()
        await banco.query('INSERT INTO vendi.pessoa(id_user, cpf) VALUES ((select id_user from Vendi.user u where u.id_user= $1),$2);',[user,data["cpf"]])
        pessoa = await banco.query('select id_pessoa from Vendi.pessoa p where p.id_user= $1',[user])
        await banco.query('INSERT INTO vendi.telefone(id_pessoa, telefone,whatsapp) VALUES ($1,$2,$3);',[pessoa.rows[0].id_pessoa,data.telefone,data["whatsapp"]])
        await banco.query('INSERT INTO vendi.endereco(id_pessoa,rua,bairro,cidade,numero, cep) VALUES ($1,$2,$3,$4,$5,$6);',[pessoa.rows[0].id_pessoa,data["rua"],data["bairro"],data["cidade"],data["numero"],data["cep"]])
        await banco.query('INSERT INTO vendi.vendedor(id_pessoa,classificacao) VALUES ($1,$2);',[pessoa.rows[0].id_pessoa,data["classificacao"]])
        pessoa= await Consulta.vendedor(token)
        if(pessoa.status== false){
          return pessoa
        }else{
          return pessoa
        }
      }
    }
  }
  async function avatar(token,caminho) {
    const user = await Consulta.verificaUser(token) 
    if(user.status== false){
      const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
      return erro
    }else{
      const banco = await Banco.session()
      const avatar = await banco.query('UPDATE vendi."user" SET linkfoto=$1 WHERE id_user=$2;',[caminho,user])
      if(avatar.rowCount==1){
      return true
      }else{
      const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
      return erro
      }
    }
  }
  async function imagemAnuncio(anuncio,caminho) {
      const banco = await Banco.session()
      const avatar = await banco.query('INSERT INTO vendi.foto(id_anuncio, linkfoto) VALUES ( $2, $1);',[caminho,anuncio])
      if(avatar.rowCount==1){
      return true
      }else{
        const erro = Funcoes.padraoErro("não foi encontrado resultados na base de dados")
        return erro
      }
  }
  async function anuncio(token,anuncio) {
    const user     = await Consulta.verificaUser(token)
    if(user.status== false){
      const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
      return erro
    }else{
      const banco          = await Banco.session()
      const {id_vendedor}  = await Consulta.vendedor(token)
                             await banco.query('INSERT INTO vendi.anuncio(id_vendedor, id_categoria, titulo, descricao, valor,dataanuncio)VALUES ($1, $2, $3, $4, $5, $6);',[id_vendedor,anuncio["categoria"],anuncio["titulo"],anuncio["descricao"],anuncio["valor"],anuncio["data"],])
      const novoAnuncio    = await banco.query('SELECT MAX(id_anuncio) FROM Vendi.anuncio')
      const id_anuncio     = novoAnuncio.rows[0].max 
      const imagem            = anuncio["file"]
      const avatar         = imagemAnuncio(id_anuncio,imagem.filename)
      return novoAnuncio.rows[0].max
    }
}
async function cliente(token,data) {
  const user     = await Consulta.verificaUser(token)
  if(user.status== false){
    const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
    return erro
  }else{
    const banco    = await Banco.session()
    await banco.query('INSERT INTO vendi.pessoa(id_user, cpf) VALUES ((select id_user from Vendi.user u where u.id_user= $1),$2);',[user,data["cpf"]])
    const pessoa = await banco.query('select id_pessoa from Vendi.pessoa p where p.id_user= $1',[user])
    await banco.query('INSERT INTO vendi.telefone(id_pessoa, telefone,whatsapp) VALUES ((select id_pessoa from Vendi.pessoa p where p.id_pessoa= $1),$2,$3);',[pessoa.rows[0].id_pessoa,data.telefone,data["whatsapp"]])
    await banco.query('INSERT INTO vendi.endereco(id_pessoa,rua,bairro,cidade,numero, cep) VALUES ((select id_pessoa from Vendi.pessoa p where p.id_pessoa= $1),$2,$3,$4,$5,$6);',[pessoa.rows[0].id_pessoa,data["rua"],data["bairro"],data["cidade"],data["numero"],data["cep"]])
    return true
  }
}
async function userTeste(password) {
  const banco    = await Banco.session()
  await banco.query("INSERT INTO Vendi.user(email, senha, nome)VALUES ('teste@teste.com',$1,'Desenvolvedor');",[password])
  return true
}
async function deletaAnuncio(id,token) {
  const vendedor = await Consulta.validaVendedor(token)
  console.log(vendedor)
  if(vendedor.status== false){
    const erro = Funcoes.padraoErro("não foi possivel identificar o usuario da requisição")
    return erro
  }else{
  const banco    = await Banco.session()
  const teste = await banco.query("delete from Vendi.anuncio  cascate where anuncio.id_anuncio= $1 ",[id])
  console.log(teste)
  return true
  }
}


module.exports = { vendedor, avatar, imagemAnuncio, anuncio, cliente, userTeste, deletaAnuncio}