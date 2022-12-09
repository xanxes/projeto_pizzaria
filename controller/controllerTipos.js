const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require("../modulo/config.js");
const DAO = require("../model/DAO/tipos");

const listarPizzaTipos = async () => {
  const result = await DAO.listarPizzaTipos();

  if (result) return { code: 200, message: result };
  return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
};

const listarPizzaComTipo = async (id) => {
  if (id == "" || id == undefined)
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  const pizzasRelacionadas = await DAO.listarPizzaComTipo(id);

  if (pizzasRelacionadas === false)
    return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };

  return { code: 200, message: pizzasRelacionadas };
};

const novaPizzaTipo = async (tipo) => {
  if (tipo == "" || tipo == undefined)
    return { code: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };

  const result = await DAO.novaPizzaTipo(tipo);

  if (result) return { code: 201, message: MESSAGE_SUCCESS.INSERT_ITEM };
  else return { code: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const buscarPizzaTipos = async (id) => {
  if (id == "" || id == undefined)
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  const tipo = await DAO.buscarPizzaTipos(id);

  if (tipo === false) return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  return { code: 200, message: tipo };
};

const deletePizzaTipos = async (id) => {
  if (id == "" || id == undefined)
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  const result = await DAO.deletePizzaTipos(id);

  if (result) return { code: 200, message: MESSAGE_SUCCESS.DELETE_ITEM };
  return { code: 400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const updatePizzaTipos = async ({ id, tipo }) => {
  if (id == "" || id == undefined || tipo == "" || tipo == undefined)
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };

  const result = await DAO.updatePizzaTipos({ id, tipo });

  if (result) return { code: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM };
  return { code: 400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};


const listarBebidaTipos = async () => {
    const result = await DAO.listarBebidaTipos();
  
    if (result) return { code: 200, message: result };
    return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  };
  
  const listarBebidaComTipo = async (id) => {
    if (id == "" || id == undefined)
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
    const pizzasRelacionadas = await DAO.listarBebidasComTipo(id);
  
    if (pizzasRelacionadas === false)
      return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
  
    return { code: 200, message: pizzasRelacionadas };
  };
  
  const novaBebidaTipo = async (tipo) => {
    if (tipo == "" || tipo == undefined)
      return { code: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  
    const result = await DAO.novaBebidaTipo(tipo);
  
    if (result) return { code: 201, message: MESSAGE_SUCCESS.INSERT_ITEM };
    else return { code: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  };
  
  const buscarBebidaTipos = async (id) => {
    if (id == "" || id == undefined)
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
    const tipo = await DAO.buscarBebidaTipos(id);
  
    if (tipo === false) return { code: 404, message: MESSAGE_ERROR.NOT_FOUND_DB };
    return { code: 200, message: tipo };
  };
  
  const deleteBebidaTipos = async (id) => {
    if (id == "" || id == undefined)
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
    const result = await DAO.deleteBebidaTipos(id);
  
    if (result) return { code: 200, message: MESSAGE_SUCCESS.DELETE_ITEM };
    return { code: 400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  };
  
  const updateBebidaTipos = async ({ id, tipo }) => {
    if (id == "" || id == undefined || tipo == "" || tipo == undefined)
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  
    const result = await DAO.updateBebidaTipos({ id, tipo });
  
    if (result) return { code: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM };
    return { code: 400, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  };
  



module.exports = {
  listarPizzaTipos,
  listarPizzaComTipo,
  novaPizzaTipo,
  buscarPizzaTipos,
  deletePizzaTipos,
  updatePizzaTipos,

  listarBebidaTipos,
  listarBebidaComTipo,
  novaBebidaTipo,
  buscarBebidaTipos,
  deleteBebidaTipos,
  updateBebidaTipos,
};
