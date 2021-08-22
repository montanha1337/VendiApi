import mongoose from 'mongoose';

// criar conexão com a base de dados
//  conexão com o banco id:root senha:admin
const connection = mongoose.connect('mongodb+srv://root:admin@cluster0.7pcvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });

//Funçao para testar a conexão

async function testaconexao() {
  const teste = await connection.connect();
  return 'Banco conectado!';
}


module.exports = { testaconexao, connection }
