/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados como BD (Insert, update, select, delete)
 * Autor: Marcelo Sanches
 * Data de criaçao: 31/10/2022
 * Versão: 1.0
****************************************************************************************************/


//Funcao para inserir um novo registro no BD
const insertCategoriaBebida = async function (categoriaBebida){
    try {
     //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
     const {PrismaClient} = require('@prisma/client')

     //Instancia da classe PrismaClient
     const prisma = new PrismaClient();

     let sql = `insert into tbl_categoria_bebida (id_categoria, id_bebida)
                                                    values('${categoriaBebida.id_categoria}', '${categoriaBebida.id_bebida}'`

     //executa o script sql no BD
     //Estecomando permite encaminhar uma variavel contendo o script
     const result = await prisma.$executeRawUnsafe(sql);

     //Verifica se o script foi executado com sucesso no BD
     if(result)
         return true
     else 
        return false

    } catch (error) {
        return false
    }

}


//Funcao para buscar os dados de curso referente a um aluno
const selectCategoriaBebida  = async function (idPizza){

    //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
     const {PrismaClient} = require('@prisma/client')

     //Instancia da classe PrismaClient
     const prisma = new PrismaClient();

     let sql = `SELECT
     tbl_pizza.id, tbl_categoria.categoria, tbl_pizza.nome, tbl_pizza.preco, tbl_pizza.imagem, tbl_pizza.desconto, tbl_pizza.descricao,
     tbl_categoria_pizza.id_pizza, tbl_categoria_pizza.id_categoria
    FROM
      tbl_pizza
      INNER JOIN tbl_categoria_pizza
      ON tbl_pizza.id = tbl_categoria_pizza.id_pizza
      INNER JOIN tbl_categoria
      ON tbl_categoria_pizza.id_categoria = tbl_categoria.id
      where tbl_pizza.id = ${idPizza}`

     const rsCategoriaBebida = await prisma.$queryRawUnsafe(sql);

     if (rsCategoriaBebida.length > 0)
         return rsCategoriaBebida;
     else
         return false;
 
}

module.exports = {
    insertCategoriaBebida,
    selectCategoriaBebida
}