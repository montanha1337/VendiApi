import Jwt from 'jsonwebtoken'
import Chave from '../Banco/connect'
import Atualiza from '../Banco/migrations/database'
import EnvioEmail from '../config/configemail'
import bcrypt from 'bcrypt'
import { unlink } from 'fs/promises';

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
    const banco= await Chave.session(`Select descricao from Vendi.Conexao con where con.id_conexao = ${mensagem}`,)

    const texto = banco.rows[0]
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

    async function criaBancoPadrao(){
        await Atualiza.vendi()
        await Atualiza.conexao()
        await Atualiza.user()
        await Atualiza.pessoa()
        await Atualiza.telefone()
        await Atualiza.endereco()
        await Atualiza.vendedor()
        await Atualiza.categoria()
        await Atualiza.anuncio()
        await Atualiza.foto()
        await Atualiza.entrega()
        await Atualiza.formadepagamento()
        await Atualiza.negociacao()
        await Atualiza.ibge()
        const password = await cripto("teste")
        await Atualiza.userTeste(password)
        return true
    }
    async function atualizaBanco(){
        await Atualiza.verificaTabela('conexao')
        await Atualiza.verificaTabela('user')
        await Atualiza.verificaTabela('pessoa')
        await Atualiza.verificaTabela('telefone')
        await Atualiza.verificaTabela('endereco')
        await Atualiza.verificaTabela('vendedor')
        await Atualiza.verificaTabela('categoria')
        await Atualiza.verificaTabela('anuncio')
        await Atualiza.verificaTabela('foto')
        await Atualiza.verificaTabela('entrega')
        await Atualiza.verificaTabela('formadepagamento')
        await Atualiza.verificaTabela('negociacao')
        await Atualiza.verificaTabela('coodmunicipio')
        await Atualiza.atualizaDadosIBGE()
        return true
    }


module.exports = {padraoErro, gerajwt, verificajwt,atualizajwt, criaBancoPadrao, atualizaBanco, verificaconexao, enviaremail,cripto, compare, gerajwtsenha, verificatokensenha,validacpf}