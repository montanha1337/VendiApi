import Banco from '../connect'
import Funcoes from '../../controller/functions'
import Consulta from './consulta'
import { isFunctionScopedDeclaration } from 'sucrase/dist/parser/tokenizer'


async function updateTable(tabela,campoUpdate,valorUpdate,campoBusca, valorBusca) {
        var script = `UPDATE Vendi.${tabela} SET ${campoUpdate}='${valorUpdate}' WHERE ${campoBusca}='${valorBusca}';`
    const banco    = await Banco.session()
    const result = await banco.query(script)
    return true
  }
  async function atualizaCliente(tabela,campo,dado,dadoPesquisa) {
      var script = `select ${campo} from Vendi.user  left outer join Vendi.pessoa    on pessoa.id_user=   Vendi.user.id_user left outer join Vendi.telefone  on telefone.id_pessoa= pessoa.id_pessoa left outer join Vendi.endereco  on endereco.id_pessoa= pessoa.id_pessoa where ${campo}='${dado}' `
      const banco    = await Banco.session()
      var result = await banco.query(script)
      if(result.rows[0]){
        return true
      }else{
        result = await updateTable(tabela,campo,dado,campo,dadoPesquisa)
        if(result== true){
          result = await Consulta.selectTable(tabela,campo,campo, dado)
          return result
        }else{
          console.log(`erro ao realizar o update da tabela ${tabela}, por favor verifique.`)
          return Funcoes.padraoErro(`erro ao realizar o update da tabela ${tabela}, por favor verifique.`)
        }
      }
    
  }
  async function atualizaVendedor(tabela,campo,dado,dadoPesquisa) {
    if(campo =='cpf'){
      const verifica = await Funcoes.validacpf(dado)
      if(verifica == false){
        const erro = Funcoes.padraoErro("não será possivel alterar o CPF, pois está inválido")
        console.log(erro.mensagem)
        return erro
      }
    }else{
    var script = `select ${campo} from Vendi.user  left outer join Vendi.pessoa    on pessoa.id_user=   Vendi.user.id_user left outer join Vendi.telefone  on telefone.id_pessoa= pessoa.id_pessoa left outer join Vendi.endereco  on endereco.id_pessoa= pessoa.id_pessoa left outer join Vendi.vendedor  on vendedor.id_pessoa= pessoa.id_pessoa where ${campo}='${dado}' `
    const banco    = await Banco.session()
    var result = await banco.query(script)
    if(result.rows[0]){
      return true
    }else{
      
      result = await updateTable(tabela,campo,dado,campo,dadoPesquisa)
      
      if(result== true){
        result = await Consulta.selectTable(tabela,campo,campo, dado)
        return result
      }else{
        console.log(`erro ao realizar o update da tabela ${tabela}, por favor verifique.`)
        return Funcoes.padraoErro(`erro ao realizar o update da tabela ${tabela}, por favor verifique.`)
      }
    }
    }
  
}

async function mediaClassificacao(vendedor,classificacao) {
  var mediaBanco
      const banco    = await Banco.session()
    var result = await banco.query("select classificacao from Vendi.vendedor v where v.id_vendedor= $1", [vendedor])
    if(result.rows[0]){
      mediaBanco= parseFloat(result.rows[0].classificacao)
      classificacao = parseFloat(classificacao)
      classificacao= (mediaBanco + classificacao) / 2
      await banco.query('update Vendi.vendedor set classificacao = $2 where id_vendedor=$1', [vendedor,classificacao])
      classificacao = await banco.query('select classificacao from Vendi.vendedor where id_vendedor=$1', [vendedor])
      return classificacao.rows[0].classificacao
    }
    const erro = Funcoes.padraoErro("Nao foi possivel realizar classificar o vendedor")
    return erro
  }



  module.exports = { updateTable, atualizaCliente, atualizaVendedor,mediaClassificacao}