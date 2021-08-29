import {Pool} from 'pg'

// criar conexão com a base de dados

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ClassifiPatos',
  password: '#abc123#',
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
