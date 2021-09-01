import Jwt from 'jsonwebtoken'
import Chave from '../Banco/connect'
import Atualiza from '../Banco/migrations/database'


function gerajwt(iduser){
    const token = Jwt.sign({iduser}, Chave.secreto, {expiresIn: 300 });
    return token
}

function verificajwt(token){
    const verificado = Jwt.verify(token,Chave.secreto, (err, decoded) =>{
        if(err) {
            return {Erro:err}
        }
        return decoded.iduser
    } )
    return verificado
}
function Atualizajwt(token,iduser){
    const atualizado = verificajwt(token)
    if(atualizado>0){
        return Atualizado
    }else{
        atualizado=gerajwt(iduser)
        return
    }
}

async function atualizabanco(){
    const {rows} = await Atualiza.criaconexao()
    await Atualiza.criauser()
    await Atualiza.criapessoa()
    const texto = rows
    return texto
}

async function verificaconexao(mensagem){
    const banco= await Chave.session()
    const result = await banco.query({
        text: "Select descricao from ClassifiPatos.Conexao con where con.id_conexao = $1",
        },
        [mensagem])

    const texto = result.rows
      return texto
    }
module.exports = { gerajwt, verificajwt,Atualizajwt, atualizabanco, verificaconexao}