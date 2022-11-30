/**************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados como BD (Insert, update, select, delete)
 * Autor: Marcelo Sanches
 * Data de criaçao: 30/11/2022
 * Versão: 1.0
****************************************************************************************************/
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js')

//Funcao para listar todos os registros da tabela
const listarBebidas = async function (){

    let dadosBebidasJSON = {};
    
    const {selectAllBebidas} = require('../model/DAO/bebida.js')
    
    const dadosBebidas = await selectAllBebidas()
    
    
    
    if(dadosBebidas)
    {
        // dadosAlunos.forEach(element => {
        //     element.id = Number(element.id)
        // });
    
        //dadosPizzas.reverse()
    
        dadosBebidasJSON.bebidas = dadosBebidas;
        return dadosBebidasJSON;
    }
    
    else
        return false
    
}

// Funcao para gerar uma nova bebida
const novaBebida = async function (bebida){

    //Validacao de campos obrigatorios
        if (bebida.nome == '' || bebida.nome ==  undefined || bebida.preco == '' || bebida.preco ==  undefined
        || bebida.imagem == '' || bebida.imagem ==  undefined || bebida.descricao == '' || bebida.descricao ==  undefined || bebida.id_fabricante == ''
        || bebida.id_fabricante == undefined)
            return { status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS} 
            else
            {
                //import da model de pizzas
                const novaBebida =  require('../model/DAO/bebida.js')
    
                //chama a funcao para inserir uma nova pizza
                const result = await novaBebida.insertBebida(bebida)
        
                
                    if(result)
                        return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                    else
                        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
            }
}

// Funcao para ataualizar dados sobre um curso
const atualizaBebida = async function (bebida){
    if (bebida.id == ''|| bebida.id == undefined)
        return {status:400, message: MESSAGE_ERROR.REQUIRED_ID}
    //Validacao de campos obrigatorios
    else if (bebida.nome == '' || bebida.nome ==  undefined || bebida.preco == '' || bebida.preco ==  undefined)
        return { status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    else
    {
    //import da model de cursos
        const atualizarBebida = require('../model/DAO/bebida.js')
        const result = await atualizarBebida.updateBebida(bebida)
    
    //chama a funcao para inserir um novo aluno
        if(result)
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM}
        else
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }
    
}

//Funcao para excluir um registro
const excluirBebida = async function (id) {
    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //Validaçao para verificar se ID existe no BD
        const pizza = await buscarPizza(id);

        //Valida se foi encontrado um registro valido
        if (pizza)
        {
            //import da model de curso
            const excluirBebida = require('../model/DAO/pizza.js');

            //chama a funcao para excluir um curso
            const result = await excluirPizza.deletePizza(id);
            
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
const buscarPizza = async function (id) {
    let dadosPizzasJSON = {};

    //Validaçao para o ID como campo obrigatório
    if (id == ''|| id == undefined)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    else{

        const { selectByIdPizza } = require ('../model/DAO/pizza.js');

        const dadosPizza = await selectByIdPizza(id);

        if (dadosPizza)
        {
            //Criamos uma chave cursos no JSON para retornar o array de curso
            dadosPizzasJSON.pizza = dadosPizza;

            return dadosPizzasJSON;
        }
        else
            return false;
    }
}

module.exports = {
    listarBebidas,
    novaBebida,
    atualizaBebida
}