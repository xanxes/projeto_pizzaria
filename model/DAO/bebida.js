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

    //Criamos um objeto do tipo RecordSet (rsAluno) para receber os dados do BD
    //atraves do script SQL  (select)
    const rsBebida = await prisma.$queryRaw `select id, nome, preco, imagem, descricao, id_fabricante from tbl_bebida order by id desc`;

    if (rsBebida.length > 0)
        return rsBebida;
    else
        return false;

}