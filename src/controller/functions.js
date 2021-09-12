import Jwt from 'jsonwebtoken'
import Chave from '../Banco/connect'
import Atualiza from '../Banco/migrations/database'
import Consulta from '../Banco/migrations/consulta'
import Cadastro from '../Banco/migrations/insert'
import EnvioEmail from '../config/configemail'
import bcrypt from 'bcrypt'

var salt = bcrypt.genSaltSync(10)

function gerajwt(iduser){
    const token = Jwt.sign({iduser}, Chave.secreto, {expiresIn: 1000 });
    return token
}

function verificajwt(token){
    const verificado = Jwt.verify(token,Chave.secreto, (err, decoded) =>{
        if(err) {
            return {Erro:err}
        }
        return decoded.iduser
    } )
    return verificado
}
function Atualizajwt(token){
    const atualizado = verificajwt(token)
        atualizado=gerajwt(atualizado)
        return atualizado
}

async function atualizabanco(){
    const {rows} = await Atualiza.criaconexao()
    await Atualiza.criauser()
    await Atualiza.criapessoa()
    await Atualiza.criatelefone()
    await Atualiza.criaendereco()
    await Atualiza.criavendedor()
    await Atualiza.criacategoria()
    await Atualiza.criaanuncio()
    await Atualiza.criafoto()
    await Atualiza.criaentrega()
    await Atualiza.criaformadepagamento()
    await Atualiza.crianegociacao()
    const texto = rows
    return texto
}

async function verificaconexao(mensagem){
    const banco= await Chave.session()
    const result = await banco.query("Select descricao from Vendi.Conexao con where con.id_conexao = $1",[mensagem])

    const texto = result.rows[0]
      return texto
    }
    //para enviar email
    async function enviaremail(email,nome,mensagem){

        const emailrest = await EnvioEmail.email(email, nome, mensagem)
            return emailrest
    }
    // Função criptografar senha
    // para criptografar true
    async function cripto(senhauser){
        for (let saltRounds = 10; saltRounds <= 15; saltRounds++) { 
            var senhaParaSalvar = bcrypt.hashSync(senhauser, salt)
          }
          return senhaParaSalvar
        }
    //Função  para comparar as senhas
    async function compare(password,senhaBanco){
        const resulth= bcrypt.compare(password, senhaBanco);
        return resulth
    }

module.exports = { gerajwt, verificajwt,Atualizajwt, atualizabanco, verificaconexao, enviaremail,cripto, compare}