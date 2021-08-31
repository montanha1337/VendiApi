import Jwt from 'jsonwebtoken'
import Chave from '../Banco/connect'
import Atualiza from '../Banco/migrations/database'


function gerajwt(iduser){
    const token = Jwt.sign({iduser}, Chave.secreto, {expiresIn: 300 });
    return token
}

function verificajwt(token){
    const verificado = Jwt.verify(token,Chave.secreto, (err, decoded) =>{
        if(err) 
            return {Erro:err}
        return decoded.iduser
    } )
    return verificado
}
async function atualizabanco(){
    const {rows} = await Atualiza.criaconexao()
    await Atualiza.criauser()
    await Atualiza.criapessoa()
    const texto = rows
    return texto
}

async function verificaconexao(){
    const banco= await Chave.session()
    const result = await banco.query({
        rowMode : 'array',
        text: "Select descricao from ClassifiPatos.Conexao con where con.id_conexao = 1",
      })
      return result.rows
    }
module.exports = { gerajwt, verificajwt, atualizabanco, verificaconexao}