import Banco from '../connect'

async function criauser(){
  const banco= await Banco.session()
  const result = await banco.query({
      rowMode : 'array',
      text: "CREATE TABLE Vendi.user (id_user SERIAL CONSTRAINT pk_id_user PRIMARY KEY,nome varchar(35) NOT NULL, email varchar(35) UNIQUE NOT NULL,senha varchar(35) NOT NULL); INSERT INTO Vendi.user(email, senha, nome)VALUES ('teste@teste.com','teste','Desenvolvedor');",
    })
    const user= banco.query({text:'select * from Vendi.user'})
    if(user){
      return user
    }
}

async function criaconexao(){
  const banco= await Banco.session()
  const result = await banco.query({
      rowMode : 'array',
      text: "CREATE SCHEMA Vendi AUTHORIZATION postgres; CREATE TABLE Vendi.conexao (id_conexao SERIAL CONSTRAINT pk_id_conexao PRIMARY KEY,descricao varchar(35) UNIQUE NOT NULL);INSERT INTO Vendi.conexao(descricao)VALUES ('Conexao realizada');INSERT INTO Vendi.conexao(descricao)VALUES ('Atualizacao feita com sucesso.');INSERT INTO Vendi.conexao(descricao)VALUES ('Banco apagado com sucesso.');",
    })
    const conexao= await banco.query({
      rowMode : 'array',
      text:"select descricao from Vendi.conexao con where con.descricao= 'Atualizacao feita com sucesso.'"
    })
    if(conexao){
      return conexao
    }
}

async function criapessoa(){
  const banco= await Banco.session()
  const result = await banco.query({
      rowMode : 'array',
      text: "CREATE TABLE Vendi.pessoa (id_pessoa SERIAL CONSTRAINT pk_id_pessoa PRIMARY KEY,nome varchar(35) NOT NULL,email varchar(35) UNIQUE NOT NULL,cpfcnpj varchar(11) UNIQUE NOT NULL,telefone varchar(9) UNIQUE NOT NULL,whatsapp varchar(9) UNIQUE NOT NULL,bairro varchar(35) NOT NULL,VendedorComprador varchar(1) NOT NULL);",
    })

    const pessoa= banco.query({text:'select * from Vendi.pessoa'})

    if(pessoa){
      return pessoa
    }
}

  async function deletaschema(){
    const banco= await Banco.session()
    const result = await banco.query({
        rowMode : 'array',
        text: "drop table Vendi.user; drop table Vendi.pessoa; drop table Vendi.conexao; drop SCHEMA Vendi",
      })
  
  }





module.exports = {criauser, criaconexao, deletaschema, criapessoa}