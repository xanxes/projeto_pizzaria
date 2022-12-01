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

//EndPoint para excluir uma pizza
app.delete('/v1/pizza/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de aluno
        const controllerPizza= require('./controller/controllerPizza.js');
        
        //Chama a funcao para excluir um item 
        const pizza = await controllerPizza.excluirPizza(id);

        statusCode = pizza.status;
        message = pizza.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});

/**************************************************************
    Rotas para CRUD (Create, Read, Update e Delete) de bebidas
    Data: 28/11/2022
***************************************************************/

//Listar todas as bebidas
app.get('/v1/bebidas', cors(), async function (request, response){

    let statusCode;
    let message;

    const controllerBebida = require('./controller/controllerBebida.js')
    const dadosBebida = await controllerBebida.listarBebidas();

    //Verifica se existe retorno de dados
    if(dadosBebida){
        statusCode = 200;
        message = dadosBebida
    }else{
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    
    response.status(statusCode);
    response.json(message);

}) 

//Inserir uma bebida
app.post('/v1/bebida', cors(), jsonParser, async function(request, response){

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
            const controllerBebida = require('./controller/controllerBebida.js')
            //Chama a funcao nova pizza da controller e encaminha os dados do body
            const novoProduto = await controllerBebida.novaBebida(dadosBody)

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

//Atualizar bebida
app.put('/v1/bebida/:id', cors(), jsonParser, async function(request, response){

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
            const controllerBebida = require('./controller/controllerBebida.js')
            //Chama a funcao novo aluno da controller e encaminha os dados do body
            const novaBebida = await controllerBebida.atualizaBebida(dadosBody)

            statusCode = novaBebida.status
            message = novaBebida.message
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

//EndPoint para excluir uma bebida
app.delete('/v1/bebida/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de aluno
        const controllerBebida = require('./controller/controllerBebida.js');
        
        //Chama a funcao para excluir um item 
        const bebida = await controllerBebida.excluirBebida(id);

        statusCode = bebida.status;
        message = bebida.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});

/**************************************************************
    Rotas para CRUD (Create, Read, Update e Delete) de categoria
    Data: 28/11/2022
***************************************************************/


//Listar todas as categorias
app.get('/v1/categorias', cors(), async function (request, response){

    let statusCode;
    let message;

    const controllerCategoria = require('./controller/controllerCategoria.js')
    const dadosCategoria = await controllerCategoria.listarCategorias();

    //Verifica se existe retorno de dados
    if(dadosCategoria){
        statusCode = 200;
        message = dadosCategoria
    }else{
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    
    response.status(statusCode);
    response.json(message);

}) 

//Inserir uma categoria
app.post('/v1/categoria', cors(), jsonParser, async function(request, response){

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
            const controllerCategoria = require('./controller/controllerCategoria.js')
            //Chama a funcao nova pizza da controller e encaminha os dados do body
            const novoProduto = await controllerCategoria.novaCategoria(dadosBody)

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

//Atualizar categoria
app.put('/v1/categoria/:id', cors(), jsonParser, async function(request, response){

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
            //adiciona o id no JSON que  chegou no corpo da requisicao
            dadosBody.id = id;
            //import do arquivo da controller da categoria
            const controllerCategoria = require('./controller/controllerCategoria.js')
            //Chama a funcao novo aluno da controller e encaminha os dados do body
            const novaCategoria = await controllerCategoria.atualizaCategoria(dadosBody)

            statusCode = novaCategoria.status
            message = novaCategoria.message
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

//EndPoint para excluir uma categoria
app.delete('/v1/categoria/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let id = request.params.id;
    
    //Validação do ID na requisição
    if (id !== '' && id !== undefined){
        //import do arquivo da controller de aluno
        const controllerCategoria = require('./controller/controllerCategoria.js');
        
        //Chama a funcao para excluir um item 
        const categoria = await controllerCategoria.excluirCategoria(id);

        statusCode = categoria.status;
        message = categoria.message;

    }else{
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);

});




//Ativa o servidor para receber requisicoes http
app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes...')
})
