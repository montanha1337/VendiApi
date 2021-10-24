import {Pool,Client} from 'pg'

// criar conexão com a base de dados
// deve-se ao instalar o banco de dados colocar #abc123# no password

const client = new Client({
  connectionString: 'postgres://odltvcxcrvlktv:910a2e991a078df3456e3c0df561cef3691662c53c5b13283c13c330ad39c2de@ec2-52-3-79-87.compute-1.amazonaws.com:5432/d862rgr5db37ii',
  ssl: {
    rejectUnauthorized: false,
    ssl:true
  },
  connectionTimeoutMillis: 1500
})

//Funçao para estabelecer a conexão

client.connect();

async function session(query) {
  
  var conexao=client.query(query, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
  return conexao
}
const secreto = 'Desenvolvemosfuturo'


module.exports = { session, client, secreto }
