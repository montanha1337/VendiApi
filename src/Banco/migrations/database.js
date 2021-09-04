import Banco from '../connect'

//Função com Script Para criar usuário
//Campos:id_user,nome,email,senha
async function criauser(){
  const banco= await Banco.session()
  const result = await banco.query({
    rowMode : 'array',
    text: "CREATE TABLE Vendi.user (id_user SERIAL CONSTRAINT pk_id_user PRIMARY KEY,nome varchar(35) NOT NULL, email varchar(35) UNIQUE NOT NULL,senha varchar(200) NOT NULL); INSERT INTO Vendi.user(email, senha, nome)VALUES ('teste@teste.com','teste','Desenvolvedor');",
  })
  const user= banco.query({text:'select * from Vendi.user'})
  if(user){
    return user
  }
}
//Função Com Script para criar a tabela conexão onde é armazenada as mensagens do backend
//Campos:id_conexao,descricao
async function criaconexao(){
  const banco= await Banco.session()
  const result = await banco.query({
      rowMode : 'array',
      text: "CREATE SCHEMA Vendi AUTHORIZATION postgres; CREATE TABLE Vendi.conexao (id_conexao SERIAL CONSTRAINT pk_id_conexao PRIMARY KEY,descricao varchar(35) UNIQUE NOT NULL);INSERT INTO Vendi.conexao(descricao)VALUES ('Conexao realizada');INSERT INTO Vendi.conexao(descricao)VALUES ('Atualizacao feita com sucesso.');INSERT INTO Vendi.conexao(descricao)VALUES ('Banco apagado com sucesso.');INSERT INTO Vendi.conexao(descricao)VALUES ('Conseguiu acessar via email!!! :)');",
    })
    const conexao= await banco.query("select descricao from Vendi.conexao con where con.descricao= 'Atualizacao feita com sucesso.'")
    if(conexao){
      return conexao
    }
}
//Função Com Script para criar a tabela pessoa
//Campos:id_pessoa,nome,email,cpfcnpj,telefone,whatsapp,bairro,VendedorComprador
async function criapessoa(){
  const banco= await Banco.session()
  const result = await banco.query("CREATE TABLE Vendi.pessoa (id_pessoa SERIAL CONSTRAINT pk_id_pessoa PRIMARY KEY,nome varchar(35) NOT NULL,email varchar(35) UNIQUE NOT NULL,cpfcnpj varchar(11) UNIQUE NOT NULL,telefone varchar(9) UNIQUE NOT NULL,whatsapp varchar(9) UNIQUE NOT NULL,bairro varchar(35) NOT NULL,VendedorComprador varchar(1) NOT NULL);")

    const pessoa= banco.query({text:'select * from Vendi.pessoa'})

    if(pessoa){
      return pessoa
    }
}
//Função Com Script para Deletar O Schema do banco de dados
  async function deletaschema(){
    const banco= await Banco.session()
    const result = await banco.query("SELECT count(nspname) FROM pg_catalog.pg_namespace;")

    if(result.rows[0].count==7){    
      const result1 = await banco.query("DROP SCHEMA Vendi CASCADE;") 
      return true
    }
    else{
      return false
    }  
  }





module.exports = {criauser, criaconexao, deletaschema, criapessoa}