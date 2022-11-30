/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados como BD (Insert, update, select, delete)
 * Autor: Marcelo Sanches
 * Data de criaçao: 28/11/2022
 * Versão: 1.0
****************************************************************************************************/

//Funcao para retornar todos os registros do BD
const selectAllBebidas = async function (){

    //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
    const {PrismaClient} = require('@prisma/client')

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //atraves do script SQL  (select)
    const rsBebida = await prisma.$queryRaw `select * from tbl_bebida order by id desc`;

    if (rsBebida.length > 0)
        return rsBebida;
    else
        return false;

}

const insertBebida = async function (bebida){
    try {
     //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
     const {PrismaClient} = require('@prisma/client')
     //Instancia da classe PrismaClient
     const prisma = new PrismaClient();

     let sql = `insert into tbl_bebida (nome, preco, imagem, descricao, id_fabricante) values('${bebida.nome}', '${bebida.preco}', '${bebida.imagem}', '${bebida.descricao}',
     '${bebida.id_fabricante}')`

     //executa o script sql no BD
     //Este comando permite encaminhar uma variavel contendo o script
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

//Funcao para atualizar um registro no BD
const updateBebida = async function (bebida){
    try {
        //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
        const {PrismaClient} = require('@prisma/client')
   
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
   
        let sql = `update tbl_bebida set nome = '${bebida.nome}', preco = '${bebida.preco}', imagem = '${bebida.imagem}', descricao = '${bebida.descricao}' where id = '${bebida.id}'`
   
        //console.log(sql)
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

module.exports = {
    selectAllBebidas,
    insertBebida,
    updateBebida


}