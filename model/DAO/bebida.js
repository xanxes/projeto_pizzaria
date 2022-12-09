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

     let sql = `insert into tbl_bebida (nome, preco, imagem, descricao, desconto, id_tipo_bebida, id_categoria)
     values('${bebida.nome}',
     '${bebida.preco}',
     '${bebida.imagem}',
     '${bebida.descricao}',
     '${bebida.desconto}',
     ${bebida.id_tipo_bebida},
     ${bebida.id_categoria})`

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
   
        let sql = `update tbl_bebida set nome = '${bebida.nome}', preco = '${bebida.preco}', imagem = '${bebida.imagem}',
        descricao = '${bebida.descricao}', desconto = '${bebida.desconto}', id_tipo_bebida = ${bebida.id_tipo_bebida},
        id_categoria = ${bebida.id_categoria}
        where id = '${bebida.id}'`
   
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
const deleteBebida = async function (id){
    try {
        //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
        const {PrismaClient} = require('@prisma/client')
   
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
   
        let sql = `delete from tbl_bebida where id = '${id}'`
   
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

const selectByIdBebida = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsPizza) para receber os dados do BD
    //através do script SQL (select)

    let sql = `select cast(id as float) as id,
                    id,
                    nome, 
                    preco,
                    imagem, 
                    descricao, 
                    desconto
                from tbl_bebida 
                where id = ${id}`

    const rsBebida = await prisma.$queryRawUnsafe(sql) ;

    if (rsBebida.length > 0)
        return rsBebida;
    else
        return false;

}

module.exports = {
    selectAllBebidas,
    insertBebida,
    updateBebida,
    deleteBebida,
    selectByIdBebida
}
