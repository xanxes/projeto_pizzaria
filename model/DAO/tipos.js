const { PrismaClient } = require("@prisma/client");
const PizzaDao = require("./pizza");
const BebidaDao = require("./bebida");

const prisma = new PrismaClient();

const listarPizzaComTipo = async (id) => {
  const response = await prisma.$queryRaw`SELECT
    tbl_pizza.id as pizzaId,
    tbl_pizza.nome,
    tbl_pizza.preco,
    tbl_pizza.desconto,
    tbl_pizza.descricao,
    tbl_pizza.imagem,
    tbl_categoria.categoria as nomeCategoria
FROM tbl_tipo_pizza
    INNER JOIN tbl_pizza on tbl_pizza.id_tipo_pizza = tbl_tipo_pizza.id
    INNER JOIN tbl_categoria on tbl_categoria.id = tbl_pizza.id_categoria
WHERE tbl_tipo_pizza.id = 1;`;

  if (response.length === 0) return false;
  return response;
};
const novaPizzaTipo = async (tipo) => {
  const sql = `INSERT INTO tbl_tipo_pizza (tipo) VALUES('${tipo}')`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
};
const listarPizzaTipos = async () => {
  const response = await prisma.$queryRaw`SELECT * FROM tbl_tipo_pizza`;

  if (response.length === 0) return false;
  return response;
};

const buscarPizzaTipos = async (id) => {
  const response =
    await prisma.$queryRaw`SELECT * FROM tbl_tipo_pizza WHERE id = ${id}`;

  if (response.length === 0) return false;
  return response;
};

const deletePizzaTipos = async (id) => {
  const pizzas = await listarPizzaTipos(id);

  // retirar as pizzas relacionadas
  await Promise.all(
    pizzas.map(async ({ id }) => {
      await PizzaDao.deletePizza(id);
    })
  );

  const response =
    await prisma.$queryRaw`DELETE FROM tbl_tipo_pizza WHERE id = ${id}`;

  if (response) return true;
  return false;
};

const updatePizzaTipos = async ({ id, tipo }) => {
  const sql = `UPDATE  tbl_tipo_pizza set tipo = '${tipo}' WHERE id = ${id}`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
};

const novaBebidaTipo = async (tipo) => {
  const sql = `INSERT INTO tbl_tipo_bebida (tipo) VALUES('${tipo}')`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
};

const listar ComTipo = async (id) => {
  const response = await prisma.$queryRaw`SELECT
    tbl_bebida.id as bebidaId,
    tbl_bebida.nome,
    tbl_bebida.preco,
    tbl_bebida.desconto,
    tbl_bebida.descricao,
    tbl_bebida.imagem,
    tbl_categoria.categoria as nomeCategoria
FROM tbl_tipo_bebida
    INNER JOIN tbl_bebida on tbl_bebida.id_tipo_bebida = tbl_tipo_bebida.id
    INNER JOIN tbl_categoria on tbl_categoria.id = tbl_bebida.id_categoria
WHERE tbl_tipo_bebida.id = ${id};`;

  if (response.length === 0) return false;
  return response;
};

const listarBebidaTipos = async () => {
  const response = await prisma.$queryRaw`SELECT * FROM tbl_tipo_bebida`;

  if (response.length === 0) return false;
  return response;
};
const buscarBebidaTipos = async (id) => {
  const response =
    await prisma.$queryRaw`SELECT * FROM tbl_tipo_bebida WHERE id = ${id}`;

  if (response.length === 0) return false;
  return response;
};
const deleteBebidaTipos = async (id) => {
  const bebidas = await listarPizzaTipos(id);

  // retirar as bebidas relacionadas
  await Promise.all(
    bebidas.map(async ({ id }) => {
      await BebidaDao.deleteBebida(id);
    })
  );

  const response =
    await prisma.$queryRaw`DELETE FROM tbl_tipo_bebida WHERE id = ${id}`;

  if (response) return true;
  return false;
};
const updateBebidaTipos = async ({ id, tipo }) => {
  const sql = `UPDATE tbl_tipo_bebida set tipo = '${tipo}' WHERE id = ${id}`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
};

module.exports = {
  novaPizzaTipo,
  novaBebidaTipo,
  listarBebidaTipos,
  buscarBebidaTipos,
  deleteBebidaTipos,
  updateBebidaTipos,
  updatePizzaTipos,
  deletePizzaTipos,
  buscarPizzaTipos,
  listarPizzaComTipo,
  listarBebidasComTipo,
  listarPizzaTipos,
};
