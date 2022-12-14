const DAO = require("../model/DAO/client_contato");
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../modulo/config");
const { listarFuncionarios } = require("./controllerFuncionario");

const insertMensagem = async ({
  nome,
  email,
  tipo_mensagem,
  mensagem,
  telefone,
  celular,
}) => {
  if (
    nome == "" ||
    nome == undefined ||
    email == "" ||
    email == undefined ||
    tipo_mensagem == "" ||
    tipo_mensagem == undefined ||
    mensagem == "" ||
    mensagem == undefined ||
    telefone == "" ||
    telefone == undefined ||
    celular == "" ||
    celular == undefined
  )
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };

  
  const result = await DAO.insertMensagem({
    nome,
    email,
    tipo_mensagem,
    mensagem,
    telefone,
    celular,
  });

  if (result) return { code: 201, message: MESSAGE_SUCCESS.INSERT_MESSAGE };
  else return { code: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const updateMensagem = async ({
  id,
  nome,
  email,
  tipo_mensagem,
  mensagem,
  telefone,
  celular,
}) => {
  if (id == "" || id == undefined)
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  if (
    nome == "" ||
    nome == undefined ||
    email == "" ||
    email == undefined ||
    tipo_mensagem == "" ||
    tipo_mensagem == undefined ||
    mensagem == "" ||
    mensagem == undefined ||
    telefone == "" ||
    telefone == undefined ||
    celular == "" ||
    celular == undefined
  )
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };

  const result = await DAO.updateMensagem({
    id,
    nome,
    email,
    tipo_mensagem,
    mensagem,
    telefone,
    celular,
  });

  if (result) return { code: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM };
  else return { code: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deleteMensagem = async (id) => {
  if (id == "" || id == undefined)
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_ID };

  const result = await DAO.deleteMensagem(id);

  if (result) return { code: 201, message: MESSAGE_SUCCESS.DELETE_ITEM };
  else return { code: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const buscarMensagem = async (id) => {
  if (id == "" || id == undefined)
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_ID };

  const result = await DAO.buscarMensagem(id);

  if (result) return { code: 200, message: result };
  else return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
};

const listarMensagem = async () => {
  const result = await DAO.listarMensagem();

  if (result) return { code: 200, message: result };
  else return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
};

module.exports = {
  insertMensagem,
  updateMensagem,
  deleteMensagem,
  buscarMensagem,
  listarMensagem,
};
