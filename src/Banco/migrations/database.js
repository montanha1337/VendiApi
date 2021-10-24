import Banco from '../connect'
import Funcao from '../../controller/functions'


//Função com Script Para criar usuário
//Campos:id_user,nome,email,senha
async function criauser(){
  await Banco.session("CREATE TABLE Vendi.user (id_user SERIAL CONSTRAINT pk_id_user PRIMARY KEY,nome varchar(35) NOT NULL, email varchar(35) UNIQUE NOT NULL,senha varchar(200) NOT NULL, linkfoto varchar(200));",)
  const user= Banco.session('select * from Vendi.user')
  if(user){
    return user
  }
}
//Função Com Script para criar a tabela conexão onde é armazenada as mensagens do backend
//Campos:id_conexao,descricao
async function criaconexao(){
  await Banco.session("CREATE SCHEMA Vendi; CREATE TABLE Vendi.conexao (id_conexao SERIAL CONSTRAINT pk_id_conexao PRIMARY KEY,descricao varchar(35) UNIQUE NOT NULL);INSERT INTO Vendi.conexao(descricao)VALUES ('Conexao realizada');INSERT INTO Vendi.conexao(descricao)VALUES ('Atualizacao feita com sucesso.');INSERT INTO Vendi.conexao(descricao)VALUES ('Banco apagado com sucesso.');INSERT INTO Vendi.conexao(descricao)VALUES ('Conseguiu acessar via email!!! :)');",)
    const conexao= await Banco.session("select descricao from Vendi.conexao con where con.descricao= 'Atualizacao feita com sucesso.'")
    if(conexao){
      return conexao
    }
}
//Função Com Script para criar a tabela pessoa
//Campos:id_pessoa,id_user,cpf
async function criapessoa(){
  await Banco.session("CREATE TABLE Vendi.pessoa (id_pessoa SERIAL CONSTRAINT pk_id_pessoa PRIMARY KEY,id_user integer REFERENCES vendi.user (id_user), cpf varchar(15) UNIQUE NOT NULL);")
  const pessoa= Banco.session('select * from Vendi.pessoa')
  if(pessoa){
    return pessoa
  }
}
//Função Com Script para criar a tabela telefone
//Campos:id_vendedor,id_pessoa,calssificacao
async function criatelefone(){
  await Banco.session("CREATE TABLE Vendi.telefone (id_telefone SERIAL CONSTRAINT pk_id_telefone PRIMARY KEY,id_pessoa integer REFERENCES vendi.pessoa (id_pessoa),telefone varchar(20) not null, whatsapp boolean NOT NULL);")
    const telefone= Banco.session('select * from Vendi.telefone')
    if(telefone){
      return telefone
    }
}
//Função Com Script para criar a tabela endereco
//Campos:id_vendedor,id_pessoa,calssificacao
async function criaendereco(){
  await Banco.session("CREATE TABLE Vendi.endereco (id_endereco SERIAL CONSTRAINT pk_id_endereco PRIMARY KEY,id_pessoa integer REFERENCES vendi.pessoa (id_pessoa), rua varchar(50) NOT NULL, bairro varchar(50) NOT NULL, cidade varchar(50) NOT NULL, cep varchar(8) NOT NULL, numero integer NOT NULL);")
    const endereco= Banco.session('select * from Vendi.endereco')
    if(endereco){
      return endereco
    }
}
//Função Com Script para criar a tabela Vendedor
//Campos:id_vendedor,id_pessoa,calssificacao
async function criavendedor(){
  await Banco.session("CREATE TABLE Vendi.vendedor (id_vendedor SERIAL CONSTRAINT pk_id_vendedor PRIMARY KEY,id_pessoa integer REFERENCES vendi.pessoa (id_pessoa), classificacao integer NOT NULL);")
    const vendedor= Banco.session('select * from Vendi.vendedor')
    if(vendedor){
      return vendedor
    }
}
//Função Com Script para criar a tabela categoria
//Campos:id_categoria, cescricao
async function criacategoria(){
  await Banco.session("CREATE TABLE Vendi.categoria (id_categoria SERIAL CONSTRAINT pk_id_categoria PRIMARY KEY, descricao varchar(50) NOT NULL);INSERT INTO vendi.categoria(descricao)VALUES ('Geral'); INSERT INTO vendi.categoria(descricao)VALUES ('Automoveis'); INSERT INTO vendi.categoria(descricao)VALUES ('Servicos');")
  const categoria= Banco.session('select * from Vendi.categoria')
  if(categoria){
    return categoria
  }
}
//Função Com Script para criar a tabela anuncio
//Campos:
async function criaanuncio(){
  await Banco.session("CREATE TABLE Vendi.anuncio (id_anuncio SERIAL CONSTRAINT pk_id_anuncio PRIMARY KEY,id_vendedor integer REFERENCES vendi.vendedor (id_vendedor),id_categoria integer REFERENCES vendi.categoria (id_categoria),titulo varchar(150) not null, descricao varchar(500) not null, valor numeric not null, dataAnuncio date not null,classificacao integer);")
  const anuncio= Banco.session('select * from Vendi.anuncio')
  if(anuncio){
    return anuncio
  }
}
async function criafoto(){
  await Banco.session("CREATE TABLE Vendi.foto (id_foto SERIAL CONSTRAINT pk_id_foto PRIMARY KEY,id_anuncio integer REFERENCES vendi.anuncio(id_anuncio),linkfoto varchar(200)not null);")
  const foto= Banco.session('select * from Vendi.foto')
  if(foto){
    return foto
  }
}
async function criaentrega(){
  await Banco.session("CREATE TABLE Vendi.entrega (id_entrega SERIAL CONSTRAINT pk_id_entrega PRIMARY KEY,id_vendedor integer REFERENCES vendi.vendedor (id_vendedor),id_endereco integer REFERENCES vendi.endereco (id_endereco),codigoRastreio varchar(50) not null, tipoEntrega integer not null, dataConfirmacaoEntrega date not null)")
  const entrega= Banco.session('select * from Vendi.entrega')
  if(entrega){
    return entrega
  }
}
async function criaformadepagamento(){
  await Banco.session("CREATE TABLE Vendi.formadepagamento (id_formadepagamento SERIAL CONSTRAINT pk_id_formadepagamento PRIMARY KEY, descricao varchar(50) NOT NULL);")
  const formadepagamento= Banco.session('select * from Vendi.formadepagamento')
  if(formadepagamento){
    return formadepagamento
  }
}
async function crianegociacao(){
  await Banco.session("CREATE TABLE Vendi.negociacao (id_negociacao SERIAL CONSTRAINT pk_id_negociacao PRIMARY KEY,id_pessoa integer REFERENCES vendi.pessoa (id_pessoa),id_anuncio integer REFERENCES vendi.anuncio (id_anuncio),id_entrega integer REFERENCES vendi.entrega (id_entrega),id_pagamento integer REFERENCES vendi.formadepagamento (id_formadepagamento), valor float not null, datanegociacao date not null);")
  const negociacao= Banco.session('select * from Vendi.negociacao')
  if(negociacao){
    return negociacao
  }
}
async function userTeste(password) {
  await Banco.session("INSERT INTO Vendi.user(email, senha, nome)VALUES ('teste@teste.com',$1,'Desenvolvedor');",[password])
  return true
}

//Função Com Script para Deletar O Schema do banco de dados
  async function deletaschema(){
    await Banco.session("SELECT count(nspname) FROM pg_catalog.pg_namespace;")

    if(result.rows[0].count==7){    
      await Banco.session("DROP SCHEMA Vendi CASCADE;") 
      return true
    }
    else{
      return false
    }  
  }





module.exports = {criauser, userTeste, criaconexao, deletaschema, criapessoa, criavendedor, criacategoria, criaanuncio, criafoto, criatelefone, criaendereco, criaentrega, criaformadepagamento, crianegociacao}