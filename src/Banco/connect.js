import {Pool} from 'pg'

// criar conexão com a base de dados
// deve-se ao instalar o banco de dados colocar #abc123# no password

const connection = new Pool({
  user: 'otapiikouggzhm',
  host: 'ec2-54-92-230-7.compute-1.amazonaws.com',
  database: 'd2ojfb67t0ob7b',
  password: '97a2dd65c6ab89c46e5b418e6279584c9ce9a4cee7910b449a0dfc5344d50fbb',
  port: 5432,
  connectionTimeoutMillis: 1500
})

//Funçao para estabelecer a conexão

 var conexao

async function session() {
  if(conexao){
       return conexao
  }else{
   conexao = await connection.connect();
   return conexao
  }
}
const secreto = 'Desenvolvemosfuturo'


module.exports = { session, connection, secreto }
