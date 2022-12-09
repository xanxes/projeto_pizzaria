/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados como BD (Insert, update, select, delete)
 * Autor: Marcelo Sanches
 * Data de criaçao: 01/12/2022
 * Versão: 1.0
****************************************************************************************************/

//Funcao para retornar todos os registros do BD
const selectAllCategorias = async function (){

    //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
    const {PrismaClient} = require('@prisma/client')

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //atraves do script SQL  (select)
    const rsCategoria = await prisma.$queryRaw `select * from tbl_categoria order by id desc`;

    if (rsCategoria.length > 0)
        return rsCategoria;
    else
        return false;

}

const insertCategoria = async function (categoria){
    try {
     //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
     const {PrismaClient} = require('@prisma/client')
     //Instancia da classe PrismaClient
     const prisma = new PrismaClient();

     let sql = `insert into tbl_categoria (categoria) values('${categoria.categoria}')`

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
const updateCategoria = async function (categoria){
    try {
        //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
        const {PrismaClient} = require('@prisma/client')
   
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
   
        let sql = `update tbl_categoria set categoria = '${categoria.categoria}' where id = '${categoria.id}'`
   
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

//Funcao para deletar um registro no BD
const deleteCategoria = async function (id){
    try {
        //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
        const {PrismaClient} = require('@prisma/client')
   
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
   
        let sql = `delete from tbl_categoria where id = '${id}'`
   
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

//Funcao para retornar apenas o registro baseado no ID
const selectByIdCategoria = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsPizza) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id,
                    id,
                    categoria
                from tbl_categoria 
                where id = ${id}`

    const rsCategoria = await prisma.$queryRawUnsafe(sql) ;

    if (rsCategoria.length > 0)
        return rsCategoria;
    else
        return false;

}

module.exports = {
    selectAllCategorias,
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    selectByIdCategoria
} 