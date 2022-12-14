/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados como BD (Insert, update, select, delete)
 * Autor: Marcelo Sanches
 * Data de criaçao: 23/11/2022
 * Versão: 1.0
****************************************************************************************************/


//Funcao para retornar todos os registros do BD
const selectAllPizzas = async function (){

    //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
    const {PrismaClient} = require('@prisma/client')

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsPizza) para receber os dados do BD
    //atraves do script SQL  (select)
    const rsPizza = await prisma.$queryRaw `SELECT id, nome, preco, imagem, descricao, desconto,
ROUND((preco-(preco*desconto/100))) as preco_final
FROM tbl_pizza order by id desc`;

    if (rsPizza.length > 0)
        return rsPizza;
    else
        return false;

}

//Funcao para inserir uma pizza no banco
const insertPizza = async function (pizza){
    try {
     //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
     const {PrismaClient} = require('@prisma/client')
     //Instancia da classe PrismaClient
     const prisma = new PrismaClient();

     let sql = `insert into tbl_pizza (nome, preco, imagem, descricao, desconto, id_categoria, id_tipo_pizza) values('${pizza.nome}',
     '${pizza.preco}',
     '${pizza.imagem}',
     '${pizza.descricao}',
     '${pizza.desconto}',
     ${pizza.id_categoria},
     ${pizza.id_tipo_pizza})`

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
const updatePizza = async function (pizza){
    try {
        //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
        const {PrismaClient} = require('@prisma/client')
   
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
   
        let sql = `update tbl_pizza set nome = '${pizza.nome}', preco = '${pizza.preco}', imagem = '${pizza.imagem}',
        descricao = '${pizza.descricao}', desconto = '${pizza.desconto}', id_tipo_pizza =  ${pizza.id_tipo_pizza}, id_categoria = ${pizza.id_categoria}
        where id = '${pizza.id}'`
   
        console.log(sql)
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
const deletePizza = async function (id){
    try {
        //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
        const {PrismaClient} = require('@prisma/client')
   
        //Instancia da classe PrismaClient
        const prisma = new PrismaClient();
   
        let sql = `delete from tbl_pizza where id = '${id}'`
   
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
const selectByIdPizza = async function (id) {

    //Import da classe prismaClient, que é responsável pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsPizza) para receber os dados do BD
    //através do script SQL (select)

    let sql = `SELECT id, nome, preco, imagem, descricao, desconto,
ROUND((preco-(preco*desconto/100))) as final_price
FROM tbl_pizza where id = ${id}`

    const rsPizza = await prisma.$queryRawUnsafe(sql) ;

    if (rsPizza.length > 0)
        return rsPizza;
    else
        return false;

}

const selectPromoPizzas = async function (){

    //Import da classe prismaClient que é responsavel pelas interacoes com os BD 
    const {PrismaClient} = require('@prisma/client')

    //Instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto do tipo RecordSet (rsPizza) para receber os dados do BD
    //atraves do script SQL  (select)
    const rsPizza = await prisma.$queryRaw `SELECT id, nome, preco, imagem, descricao, desconto,
    ROUND((preco-(preco*desconto/100))) as preco_final
    FROM tbl_pizza where desconto > 0 order by id desc`;

    if (rsPizza.length > 0)
        return rsPizza;
    else
        return false;

}


module.exports = {
    insertPizza,
    selectAllPizzas,
    updatePizza,
    deletePizza,
    selectByIdPizza,
    selectPromoPizzas
}
