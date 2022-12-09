const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../modulo/config.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DAO = require("../model/DAO/funcionario");

const listarFuncionarios = async () => {
  const response = await DAO.listarFuncionarios();

  if (!response) {
    return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  }
  return { code: 200, message: response };
};

const buscarFuncionario = async (id) => {
  if (id == "" || id == undefined)
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };

  const response = await DAO.buscarFuncionario(id);

  if (!response) {
    return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  }
  return { code: 200, message: response };
};

const deleteFuncionario = async (id) => {
  if (id == "" || id == undefined)
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };

  const response = await DAO.deleteFuncionario(id);

  if (!response) {
    return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  }
  return { code: 200, message: MESSAGE_SUCCESS.DELETE_ITEM };
};

const updateFuncionario = async ({
  id,
  nome,
  rg,
  cpf,
  telefone,
  email,
  senha,
}) => {
  if (id == "" || id == undefined)
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };

  if (
    nome == "" ||
    nome == undefined ||
    rg == "" ||
    rg == undefined ||
    cpf == "" ||
    cpf == undefined ||
    telefone == "" ||
    telefone == undefined ||
    email == "" ||
    email == undefined ||
    senha == "" ||
    senha == undefined
  )
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };

  const senhaCriptografada = await bcryptjs.hash(senha, 8);
  
  const response = await DAO.updateFuncionario({
    id,
    nome,
    rg,
    cpf,
    telefone,
    email,
    senha: senhaCriptografada,
  });

  if (!response) {
    return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  }
  return { code: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM };
};

const novoFuncionario = async ({ nome, rg, cpf, telefone, email, senha }) => {
  if (
    nome == "" ||
    nome == undefined ||
    rg == "" ||
    rg == undefined ||
    cpf == "" ||
    cpf == undefined ||
    telefone == "" ||
    telefone == undefined ||
    email == "" ||
    email == undefined ||
    senha == "" ||
    senha == undefined
  )
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };

  const senhaCriptografada = await bcryptjs.hash(senha, 8);

  const result = await DAO.novoFuncionario({
    nome,
    rg,
    cpf,
    telefone,
    email,
    senha: senhaCriptografada,
  });
  if (result) return { code: 201, message: MESSAGE_SUCCESS.INSERT_ITEM };
  else return { code: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const login = async ({ email, senha }) => {
  if (email == "" || email == undefined || senha == "" || senha == undefined)
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };

  const funcionario = await DAO.buscarPeloEmail(email);

  if (funcionario === false) {
    return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  }

  const comparaSenha = await bcryptjs.compare(senha, funcionario[0].senha);

  if (comparaSenha === false) {
    return {
      code: 401,
      message: "Senha incorreta não autorizado!",
    };
  }

  const token = jwt.sign({ data: funcionario }, "tokenSecreto");

  return { code: 200, message: token };
};

module.exports = {
  listarFuncionarios,
  buscarFuncionario,
  novoFuncionario,
  deleteFuncionario,
  updateFuncionario,
  login,
};
