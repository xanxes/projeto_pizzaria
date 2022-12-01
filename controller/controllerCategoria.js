/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados como BD (Insert, update, select, delete)
 * Autor: Marcelo Sanches
 * Data de criaçao: 01/12/2022
 * Versão: 1.0
****************************************************************************************************/
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js')

// Funcao para gerar uma nova categoria
const novaCategoria = async function (categoria){

    //Validacao do campo obrigatorio
        if (categoria.categoria == '' || categoria.categoria ==  undefined)
            return { status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS} 
            else
            {
                //import da model de
                const novaCategoria =  require('../model/DAO/categoria.js')
    
                //chama a funcao para inserir uma nova pizza
                const result = await novaCategoria.insertCategoria(categoria)
        
            
                    if(result)
                        return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                    else
                        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
}

//Funcao para listar todos os registros da tabela
const listarCategorias = async function (){

    let dadosCategoriasJSON = {};
    
    const {selectAllCategorias} = require('../model/DAO/categoria.js')
    
    const dadosCategorias = await selectAllCategorias()
    
    
    
    if(dadosCategorias)
    {
        // dadosAlunos.forEach(element => {
        //     element.id = Number(element.id)
        // });
    
        //dadosPizzas.reverse()
    
        dadosCategoriasJSON.categorias = dadosCategorias;
        return dadosCategoriasJSON;
    }
    
    else
        return false
    
}

const atualizaCategoria = async function (categoria){
    if (categoria.id == ''|| categoria.id == undefined)
        return {status:400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatorios
    else if (categoria.categoria == '' || categoria.categoria ==  undefined)
        return { status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    else
    {
    //import da model de cursos
        const atualizarCategoria = require('../model/DAO/categoria.js')
        const result = await atualizarCategoria.updateCategoria(categoria)
    
    //chama a funcao para inserir um novo aluno
        if(result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
    
}

//Funcao para excluir um registro
const excluirCategoria = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const categoria = await buscarCategoria(id);

        //Valida se foi encontrado um registro valido
        if (categoria)
        {
            //import da model de curso
            const excluirCategoria = require('../model/DAO/categoria.js');

            //chama a funcao para excluir um curso
            const result = await excluirCategoria.deleteCategoria(id);
            
            if (result)
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            else
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    }
}

//Funcao para retornar um registro baseado no ID
const buscarCategoria = async function (id) {
    let dadosCategoriasJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdCategoria } = require ('../model/DAO/categoria.js');

        const dadosCategoria = await selectByIdCategoria(id);

        if (dadosCategoria)
        {
            //Criamos uma chave cursos no JSON para retornar o array de curso
            dadosCategoriasJSON.categoria = dadosCategoria;

            return dadosCategoriasJSON;
        }
        else
            return false;
    }
}

module.exports = {
        novaCategoria,
        listarCategorias,
        atualizaCategoria,
        buscarCategoria,
        excluirCategoria
    }