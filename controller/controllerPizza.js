/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a module
 * Autor: Marcelo Sanches
 * Data de criaçao: 23/11/2022
 * Versão: 1.0
****************************************************************************************************/
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js')

// Funcao para gerar uma nova pizza
const novaPizza = async function (pizza){

//Validacao de campos obrigatorios
    if (pizza.nome == '' || pizza.nome ==  undefined || pizza.preco == '' || pizza.preco ==  undefined
    || pizza.imagem == '' || pizza.imagem ==  undefined || pizza.descricao == '' || pizza.descricao ==  undefined || pizza.id_tipo_pizza == ''
    || pizza.id_tipo_pizza == undefined)
        return { status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS} 
        else
        {
            //import da model de pizzas
            const novaPizza =  require('../model/DAO/pizza.js')

            //chama a funcao para inserir uma nova pizza
            const result = await novaPizza.insertPizza(pizza)
    
            
                if(result)
                    return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                else
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }

//Funcao para listar todos os registros da tabela
const listarPizzas = async function (){

    let dadosPizzasJSON = {};
    
    const {selectAllPizzas} = require('../model/DAO/pizza.js')
    
    const dadosPizzas = await selectAllPizzas()
    
    
    
    if(dadosPizzas)
    {
        // dadosAlunos.forEach(element => {
        //     element.id = Number(element.id)
        // });
    
        //dadosPizzas.reverse()
    
        dadosPizzasJSON.pizzas = dadosPizzas;
        return dadosPizzasJSON;
    }
    
    else
        return false
    
}

// Funcao para ataualizar dados sobre um curso
const atualizaPizza = async function (pizza){
    if (pizza.id == ''|| pizza.id == undefined)
        return {status:400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatorios
    else if (pizza.nome == '' || pizza.nome ==  undefined || pizza.preco == '' || pizza.preco ==  undefined)
        return { status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    else
    {
    //import da model de cursos
        const atualizarPizza = require('../model/DAO/pizza.js')
        const result = await atualizarPizza.updatePizza(pizza)
    
    //chama a funcao para inserir um novo aluno
        if(result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
    
}

//Funcao para excluir um aluno
const deletarPizza = async function (id){
    if (id == '' || id == undefined)
    return {status:400, message: MESSAGE_ERROR.REQUIRED_ID}
else{
    //Validacao para verificar se o id existe no BD
    const buscar = await buscarPizza(id)
    if (buscar){
    const excluirCurso = require('../model/DAO/curso.js')
    const result = await excluirCurso.deleteCurso(id)
    

    if(result)
        return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM}
    else
        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }else{
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB}
        } 
    }
}

module.exports = {
    novaPizza,
    listarPizzas,
    atualizaPizza
}