import Banco from '../connect'
import Funcoes from '../../controller/functions'

async function vendedor(token,data) {
    const user     = 2
    const banco    = await Banco.session()
    await banco.query('INSERT INTO vendi.pessoa(id_user, cpf) VALUES ((select id_user from Vendi.user u where u.id_user= $1),$2);',[user,data["cpf"]])
    const pessoa = await banco.query('select id_pessoa from Vendi.pessoa p where p.id_user= $1',[user])
    await banco.query('INSERT INTO vendi.telefone(id_pessoa, telefone,whatsapp) VALUES ((select id_pessoa from Vendi.pessoa p where p.id_pessoa= $1),$2,$3);',[pessoa.rows[0].id_pessoa,data.telefone,data["whatsapp"]])
    await banco.query('INSERT INTO vendi.endereco(id_pessoa,rua,bairro,cidade,numero, cep) VALUES ((select id_pessoa from Vendi.pessoa p where p.id_pessoa= $1),$2,$3,$4,$5,$6);',[pessoa.rows[0].id_pessoa,data["rua"],data["bairro"],data["cidade"],data["numero"],data["cep"]])
    await banco.query('INSERT INTO vendi.vendedor(id_pessoa,classificacao) VALUES ((select id_pessoa from Vendi.pessoa p where p.id_pessoa= $1),$2);',[pessoa.rows[0].id_pessoa,data["classificacaoVendedor"]])
   return true
  }


module.exports = {vendedor}