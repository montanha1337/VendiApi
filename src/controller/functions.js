import Jwt from 'jsonwebtoken'
import Chave from '../Banco/connect'
import Atualiza from '../Banco/migrations/database'
import EnvioEmail from '../config/configemail'
import bcrypt from 'bcrypt'
import multer from 'multer'

const parser = multer({ dest: 'uploads' })

var salt = bcrypt.genSaltSync(10)

function padraoErro(mensagem){
    var erro= Object()
    erro.mensagem=mensagem
    erro.status=false
    return erro
}

function gerajwt(iduser){
    const token = Jwt.sign({iduser}, Chave.secreto, {expiresIn: "30 days" });
    return token
}
function gerajwtsenha(emailuser){
    const token = Jwt.sign({emailuser}, Chave.secreto, {expiresIn: "30 days" });
    return token
}

function verificajwt(token){
    var verificado = Jwt.verify(token,Chave.secreto, (err, decoded) =>{
        if(decoded) {
        return decoded.iduser
        }
        return false
    } )
    return verificado
}
function verificatokensenha(token){
    var verificado = Jwt.verify(token,Chave.secreto, (err, decoded) =>{
        if(decoded) {
        return decoded.emailuser
        }
        return false
    } )
    return verificado
}
function atualizajwt(token){
    var atualizado = verificajwt(token)
    if(atualizado == false){
        return false
    }
         const text=gerajwt(atualizado)
        return text
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

    async function validacpf(cpf){
        var Soma;
        var Resto;
        Soma = 0;
        var i
      if (cpf == "00000000000") {
          return false
    }    
      for (i=1; i<=9; i++) {
          Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
      }
      Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  {
            Resto = 0;
        }
        if (Resto != parseInt(cpf.substring(9, 10)) ){ 
            return false;
        }
        Soma = 0;
        for (i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
        }
        Resto = (Soma * 10) % 11;
    
        if ((Resto == 10) || (Resto == 11))  {
            Resto = 0;
        }
        if (Resto != parseInt(cpf.substring(10, 11) ) ) {
            return false
        }
        return true;
    }
    async function baixarImagem(imagem) {
       const img= parser.single('imagem')
        return img
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
        const password = await cripto("teste")
        await Atualiza.userTeste(password)
        const texto = rows
        return texto
    }


module.exports = {padraoErro, gerajwt, verificajwt,atualizajwt, atualizabanco, verificaconexao, enviaremail,cripto, compare, gerajwtsenha, verificatokensenha,validacpf, baixarImagem}