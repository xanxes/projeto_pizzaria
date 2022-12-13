/**************************************************************************************************
 * Objetivo: API responsavel pela manipulacao de dados do backend (GET, POST, PUT, DELETE)
 * Autor: Marcelo Sanches
 * Data de criaçao: 23/11/2022
 * Versão: 1.0
 ****************************************************************************************************/

const { Router } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { request } = require("express");
const { response } = require("express");
const { header } = require("express/lib/request");
const req = require("express/lib/request");
const { checkLogin } = require("../utils/checkLogin")
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../modulo/config.js");
const app = express();
const routes = Router();

routes.use((request, response, next) => {
  response.header(`Access-Control-Allow-Origin`, `*`);
  response.header(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
  response.header(`Access-Control-Allow-Headers`, `Origin, X-Request-Width, Content-Type, Accept`);
  app.use(cors());
  next();
});

const jsonParser = bodyParser.json();

//Inserir uma pizza
routes.post(
  "/v1/pizza",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers["content-type"];

    if (headerContentType == "application/json") {
      let dadosBody = request.body;

      //Realiza o processo de conversao de dados para conseguir comparar um json vazio
      if (JSON.stringify(dadosBody) != "{}") {
        //import do arquivo da controller da pizza
        const controllerPizza = require("../controller/controllerPizza.js");
        //Chama a funcao nova pizza da controller e encaminha os dados do body
        const novoProduto = await controllerPizza.novaPizza(dadosBody);

        statusCode = novoProduto.status;
        message = novoProduto.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_BODY;
      }
    } else {
      statusCode = 415;
      message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
  }
);

//Listar as pizzas em promoção
routes.get("/v1/promocao/pizzas", cors(), async function (request, response) {
    let statusCode;
    let message;
  
    //Import do arquivo controllerAluno
    const controllerPizza = require("../controller/controllerPizza.js");
    const dadosPizza = await controllerPizza.listarPromoPizzas();
  
    //Verifica se existe retorno de dados
    if (dadosPizza) {
      statusCode = 200;
      message = dadosPizza;
    } else {
      statusCode = 404;
      message = MESSAGE_ERROR.NOT_FOUND_DB;
    }
  
    response.status(statusCode);
    response.json(message);
  });

//Listar todas as pizzas
routes.get("/v1/pizzas", cors(), async function (request, response) {
  let statusCode;
  let message;

  //Import do arquivo controllerAluno
  const controllerPizza = require("../controller/controllerPizza.js");
  const dadosPizza = await controllerPizza.listarPizzas();

  //Verifica se existe retorno de dados
  if (dadosPizza) {
    statusCode = 200;
    message = dadosPizza;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_DB;
  }

  response.status(statusCode);
  response.json(message);
});

//Atualizar pizza
routes.put(
  "/v1/pizza/:id",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers["content-type"];

    if (headerContentType == "application/json") {
      let dadosBody = request.body;

      //Realiza o processo de conveersao de dados para conseguir comparar um json vazio
      if (JSON.stringify(dadosBody) != "{}") {
        ///recebe o id enviado por parametro na requisicao
        let id = request.params.id;
        //validacao do id na requisicao
        if (id != "" && id != undefined) {
          //adiciona o id no JSON que  hegou no corpo da requisicao
          dadosBody.id = id;
          //import do arquivo da controller da pizza
          const controllerPizza = require("../controller/controllerPizza.js");
          //Chama a funcao novo aluno da controller e encaminha os dados do body
          const novaPizza = await controllerPizza.atualizaPizza(dadosBody);

          statusCode = novaPizza.status;
          message = novaPizza.message;
        } else {
          statusCode = 400;
          message = MESSAGE_ERROR.REQUIRED_ID;
        }
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_BODY;
      }
    } else {
      statusCode = 415;
      message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
  }
);

//EndPoint para excluir uma pizza
routes.delete(
  "/v1/pizza/:id",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id !== "" && id !== undefined) {
      //import do arquivo da controller de aluno
      const controllerPizza = require("../controller/controllerPizza.js");

      //Chama a funcao para excluir um item
      const pizza = await controllerPizza.excluirPizza(id);

      statusCode = pizza.status;
      message = pizza.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);
  }
);

/**************************************************************
    Rotas para CRUD (Create, Read, Update e Delete) de bebidas
    Data: 28/11/2022
***************************************************************/

//Listar todas as bebidas
routes.get("/v1/bebidas", cors(), async function (request, response) {
  let statusCode;
  let message;

  const controllerBebida = require("../controller/controllerBebida.js");
  const dadosBebida = await controllerBebida.listarBebidas();

  //Verifica se existe retorno de dados
  if (dadosBebida) {
    statusCode = 200;
    message = dadosBebida;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_DB;
  }

  response.status(statusCode);
  response.json(message);
});

//Inserir uma bebida
routes.post(
  "/v1/bebida",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers["content-type"];

    if (headerContentType == "application/json") {
      let dadosBody = request.body;

      //Realiza o processo de conversao de dados para conseguir comparar um json vazio
      if (JSON.stringify(dadosBody) != "{}") {
        //import do arquivo da controller da pizza
        const controllerBebida = require("../controller/controllerBebida.js");
        //Chama a funcao nova pizza da controller e encaminha os dados do body
        const novoProduto = await controllerBebida.novaBebida(dadosBody);

        statusCode = novoProduto.status;
        message = novoProduto.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_BODY;
      }
    } else {
      statusCode = 415;
      message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
  }
);

//Atualizar bebida
routes.put(
  "/v1/bebida/:id",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers["content-type"];

    if (headerContentType == "application/json") {
      let dadosBody = request.body;

      //Realiza o processo de conveersao de dados para conseguir comparar um json vazio
      if (JSON.stringify(dadosBody) != "{}") {
        ///recebe o id enviado por parametro na requisicao
        let id = request.params.id;
        //validacao do id na requisicao
        if (id != "" && id != undefined) {
          //adiciona o id no JSON que  hegou no corpo da requisicao
          dadosBody.id = id;
          //import do arquivo da controller da pizza
          const controllerBebida = require("../controller/controllerBebida.js");
          //Chama a funcao novo aluno da controller e encaminha os dados do body
          const novaBebida = await controllerBebida.atualizaBebida(dadosBody);

          statusCode = novaBebida.status;
          message = novaBebida.message;
        } else {
          statusCode = 400;
          message = MESSAGE_ERROR.REQUIRED_ID;
        }
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_BODY;
      }
    } else {
      statusCode = 415;
      message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
  }
);

//EndPoint para excluir uma bebida
routes.delete(
  "/v1/bebida/:id",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id !== "" && id !== undefined) {
      //import do arquivo da controller de aluno
      const controllerBebida = require("../controller/controllerBebida.js");

      //Chama a funcao para excluir um item
      const bebida = await controllerBebida.excluirBebida(id);

      statusCode = bebida.status;
      message = bebida.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);
  }
);

/**************************************************************
    Rotas para CRUD (Create, Read, Update e Delete) de categoria
    Data: 28/11/2022
***************************************************************/

//Listar todas as categorias
routes.get("/v1/categorias", cors(), async function (request, response) {
  let statusCode;
  let message;

  const controllerCategoria = require("../controller/controllerCategoria.js");
  const dadosCategoria = await controllerCategoria.listarCategorias();

  //Verifica se existe retorno de dados
  if (dadosCategoria) {
    statusCode = 200;
    message = dadosCategoria;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_DB;
  }

  response.status(statusCode);
  response.json(message);
});

//Inserir uma categoria
routes.post(
  "/v1/categoria",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers["content-type"];

    if (headerContentType == "application/json") {
      let dadosBody = request.body;

      //Realiza o processo de conversao de dados para conseguir comparar um json vazio
      if (JSON.stringify(dadosBody) != "{}") {
        //import do arquivo da controller da pizza
        const controllerCategoria = require("../controller/controllerCategoria.js");
        //Chama a funcao nova pizza da controller e encaminha os dados do body
        const novoProduto = await controllerCategoria.novaCategoria(dadosBody);

        statusCode = novoProduto.status;
        message = novoProduto.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_BODY;
      }
    } else {
      statusCode = 415;
      message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
  }
);

//Atualizar categoria
routes.put(
  "/v1/categoria/:id",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers["content-type"];

    if (headerContentType == "application/json") {
      let dadosBody = request.body;

      //Realiza o processo de conveersao de dados para conseguir comparar um json vazio
      if (JSON.stringify(dadosBody) != "{}") {
        ///recebe o id enviado por parametro na requisicao
        let id = request.params.id;
        //validacao do id na requisicao
        if (id != "" && id != undefined) {
          //adiciona o id no JSON que  chegou no corpo da requisicao
          dadosBody.id = id;
          //import do arquivo da controller da categoria
          const controllerCategoria = require("../controller/controllerCategoria.js");
          //Chama a funcao novo aluno da controller e encaminha os dados do body
          const novaCategoria = await controllerCategoria.atualizaCategoria(
            dadosBody
          );

          statusCode = novaCategoria.status;
          message = novaCategoria.message;
        } else {
          statusCode = 400;
          message = MESSAGE_ERROR.REQUIRED_ID;
        }
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.EMPTY_BODY;
      }
    } else {
      statusCode = 415;
      message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode);
    response.json(message);
  }
);

//EndPoint para excluir uma categoria
routes.delete(
  "/v1/categoria/:id",
  cors(),
  jsonParser,
  async function (request, response) {
    let statusCode;
    let message;
    let id = request.params.id;

    //Validação do ID na requisição
    if (id !== "" && id !== undefined) {
      //import do arquivo da controller de aluno
      const controllerCategoria = require("../controller/controllerCategoria.js");

      //Chama a funcao para excluir um item
      const categoria = await controllerCategoria.excluirCategoria(id);

      statusCode = categoria.status;
      message = categoria.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);
  }
);

// FUNCIONARIO ROUTES

// list all FUNCIONARIO
routes.get("/v1/funcionario/", cors(), async (req, res) => {
  const controllerFuncionario = require("../controller/controllerFuncionario");

  const funcionarios = await controllerFuncionario.listarFuncionarios();

  res.status(funcionarios.code);
  res.json(funcionarios.message);
});

routes.get("/v1/funcionario/:id", cors(), async (req, res) => {
  const controllerFuncionario = require("../controller/controllerFuncionario");

  const funcionarios = await controllerFuncionario.buscarFuncionario(
    req.params.id
  );

  res.status(funcionarios.code);
  res.json(funcionarios.message);
});

routes.post("/v1/funcionario/", cors(), jsonParser, async (req, res) => {
  const controllerFuncionario = require("../controller/controllerFuncionario");

  const funcionarios = await controllerFuncionario.novoFuncionario(req.body);

  res.status(funcionarios.code);
  res.json(funcionarios.message);
});

routes.post("/v1/funcionario/login", cors(), jsonParser, async (req, res) => {
  const controllerFuncionario = require("../controller/controllerFuncionario");

  const funcionarios = await controllerFuncionario.login(req.body);

  res.status(funcionarios.code);
  res.json(funcionarios.message);
});

routes.delete("/v1/funcionario/:id", cors(), async (req, res) => {
  const controllerFuncionario = require("../controller/controllerFuncionario");

  const funcionarios = await controllerFuncionario.deleteFuncionario(
    req.params.id
  );

  res.status(funcionarios.code);
  res.json(funcionarios.message);
});

routes.put("/v1/funcionario/:id", cors(), jsonParser, async (req, res) => {
  const controllerFuncionario = require("../controller/controllerFuncionario");

  const data = {
    id: req.params.id,
    nome: req.body.nome,
    rg: req.body.rg,
    cpf: req.body.cpf,
    telefone: req.body.telefone,
    email: req.body.email,
    senha: req.body.senha,
  };

  const funcionarios = await controllerFuncionario.updateFuncionario(data);

  res.status(funcionarios.code);
  res.json(funcionarios.message);
});

// tipos pizza

routes.get("/v1/tipos/pizza", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const tipos = await controllerTipos.listarPizzaTipos();

  res.status(tipos.code);
  res.json(tipos.message);
});

routes.get("/v1/tipos/pizza/listar/:id", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const pizzas = await controllerTipos.listarPizzaComTipo(req.params.id);

  res.status(pizzas.code);
  res.json(pizzas.message);
});

routes.get("/v1/tipos/pizza/:id", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const tipo = await controllerTipos.buscarPizzaTipos(req.params.id);

  res.status(tipo.code);
  res.json(tipo.message);
});

routes.post("/v1/tipos/pizza", cors(), jsonParser, async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const value = req.body.tipo;
  const tipo = await controllerTipos.novaPizzaTipo(value);

  res.status(tipo.code);
  res.json(tipo.message);
});

routes.put("/v1/tipos/pizza/:id", cors(), jsonParser, async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const value = req.body.tipo;
  const tipo = await controllerTipos.updatePizzaTipos({
    tipo: value,
    id: req.params.id,
  });

  res.status(tipo.code);
  res.json(tipo.message);
});

routes.delete("/v1/tipos/pizza/:id", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const tipo = await controllerTipos.deletePizzaTipos(req.params.id);

  res.status(tipo.code);
  res.json(tipo.message);
});

// tipos bebida

routes.get("/v1/tipos/bebida", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const tipos = await controllerTipos.listarBebidaTipos();

  res.status(tipos.code);
  res.json(tipos.message);
});

routes.get("/v1/tipos/bebida/listar/:id", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const pizzas = await controllerTipos.listarBebidaComTipo(req.params.id);

  res.status(pizzas.code);
  res.json(pizzas.message);
});

routes.get("/v1/tipos/bebida/:id", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const tipo = await controllerTipos.buscarBebidaTipos(req.params.id);

  res.status(tipo.code);
  res.json(tipo.message);
});

routes.post("/v1/tipos/bebida", cors(), jsonParser, async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const value = req.body.tipo;
  const tipo = await controllerTipos.novaBebidaTipo(value);

  res.status(tipo.code);
  res.json(tipo.message);
});

routes.put("/v1/tipos/bebida/:id", cors(), jsonParser, async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const value = req.body.tipo;
  const tipo = await controllerTipos.updateBebidaTipos({
    tipo: value,
    id: req.params.id,
  });

  res.status(tipo.code);
  res.json(tipo.message);
});

routes.delete("/v1/tipos/bebida/:id", cors(), async (req, res) => {
  const controllerTipos = require("../controller/controllerTipos");

  const tipo = await controllerTipos.deleteBebidaTipos(req.params.id);

  res.status(tipo.code);
  res.json(tipo.message);
});

// CRUD MENSAGEM

routes.get("/v1/mensagem/", cors(), async (req, res) => {
  const controllerMensagem = require("../controller/controllerMensagem");

  const mensagens = await controllerMensagem.listarMensagem();

  res.status(mensagens.code);
  res.json(mensagens.message);
});

routes.get("/v1/mensagem/:id", cors(), async (req, res) => {
  const controllerMensagem = require("../controller/controllerMensagem");

  const mensagem = await controllerMensagem.buscarMensagem(req.params.id);

  res.status(mensagem.code);
  res.json(mensagem.message);
});

routes.post("/v1/mensagem/", cors(), jsonParser, async (req, res) => {
  const controllerMensagem = require("../controller/controllerMensagem");

  const data = req.body;
  const mensagem = await controllerMensagem.insertMensagem(data);

  res.status(mensagem.code);
  res.json(mensagem.message);
});

routes.put("/v1/mensagem/:id", cors(), jsonParser, checkLogin, async (req, res) => {
  const controllerMensagem = require("../controller/controllerMensagem");

  const data = {
    id: req.params.id,
    nome: req.body.nome,
    email: req.body.email,
    tipo_mensagem: req.body.tipo_mensagem,
    mensagem: req.body.mensagem,
    telefone: req.body.telefone,
    celular: req.body.celular,
  };

  const mensagem = await controllerMensagem.updateMensagem(data);

  res.status(mensagem.code);
  res.json(mensagem.message);
});

// EXEMPLO DE ROTA FECHADA COM O JSON TOKEN

routes.delete("/v1/mensagem/:id", cors(), checkLogin, async (req, res) => {
  const controllerMensagem = require("../controller/controllerMensagem");

  const mensagens = await controllerMensagem.deleteMensagem(req.params.id);

  res.status(mensagens.code);
  res.json(mensagens.message);
});

app.use("/.netlify/functions/api", routes);

// Start da API
// app.listen(8080, function () {
//   console.log("Servidor aguardando requisicoes.");
// });

module.exports = app;
