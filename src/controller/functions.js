import Jwt from 'jsonwebtoken'
import Chave from '../Banco/connect'


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
module.exports = { gerajwt, verificajwt}