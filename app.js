/**************************************************************************************************
 * Objetivo: API responsavel pela manipulacao de dados do backend (GET, POST, PUT, DELETE)
 * Autor: Marcelo Sanches
 * Data de criaçao: 23/11/2022
 * Versão: 1.0
****************************************************************************************************/

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { request } = require('express');
const { response } = require('express');
const { header } = require('express/lib/request');
const req = require('express/lib/request');
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./modulo/config.js');
const app = express();

app.use((request, response, next) => {
    response.header(`Access-Control-Allow-Origin`, `*`);
    response.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
    app.use(cors());
    next();
})

const jsonParser = bodyParser.json()

//Inserir uma pizza
app.post('/v1/pizza', cors(), jsonParser, async function(request, response){

    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type']
 
    if(headerContentType == 'application/json')
    {
        let dadosBody = request.body;
        
        //Realiza o processo de conversao de dados para conseguir comparar um json vazio
        if (JSON.stringify(dadosBody) != '{}'){
            //import do arquivo da controller da pizza
            const controllerPizza = require('./controller/controllerPizza.js')
            //Chama a funcao nova pizza da controller e encaminha os dados do body
            const novoProduto = await controllerPizza.novaPizza(dadosBody)

        statusCode = novoProduto.status
        message = novoProduto.message

        }else
        {
            statusCode =  400;
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)

})

//Listar todas as pizzas
app.get('/v1/pizzas', cors(), async function (request, response){

    let statusCode;
    let message;

    //Import do arquivo controllerAluno
    const controllerPizza = require('./controller/controllerPizza.js')
    const dadosPizza = await controllerPizza.listarPizzas();

    //Verifica se existe retorno de dados
    if(dadosPizza){
        statusCode = 200;
        message = dadosPizza
    }else{
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    
    response.status(statusCode);
    response.json(message);

}) 

//Atualizar pizza
app.put('/v1/pizza/:id', cors(), jsonParser, async function(request, response){

    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type']
 
    if(headerContentType == 'application/json')
    {
        let dadosBody = request.body;
        
        //Realiza o processo de conveersao de dados para conseguir comparar um json vazio
        if (JSON.stringify(dadosBody) != '{}')
        {
            ///recebe o id enviado por parametro na requisicao
            let id = request.params.id;
            //validacao do id na requisicao
            if(id != '' && id != undefined){
            //adiciona o id no JSON que  hegou no corpo da requisicao
            dadosBody.id = id;
            //import do arquivo da controller da pizza
            const controllerPizza = require('./controller/controllerPizza.js')
            //Chama a funcao novo aluno da controller e encaminha os dados do body
            const novaPizza = await controllerPizza.atualizaPizza(dadosBody)

            statusCode = novaPizza.status
            message = novaPizza.message
        }else {
            statusCode = 400
            message = MESSAGE_ERROR.REQUIRED_ID
        }

        }else{
            statusCode =  400;
            message = MESSAGE_ERROR.EMPTY_BODY
        }
        
    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)

})

//Ativa o servidor para receber requisicoes http
app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes...')
})