const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const listarFuncionarios = async () => {
  const response = await prisma.$queryRaw`SELECT * FROM tbl_funcionario`;

  if (response.length === 0) return false;
  return response;
};

const buscarFuncionario = async (id) => {
  const response =
    await prisma.$queryRaw`SELECT * FROM tbl_funcionario WHERE  id = ${id}`;

  if (response.length === 0) return false;
  return response;
};

const novoFuncionario = async ({ nome, rg, cpf, telefone, email, senha }) => {
  const sql = `INSERT INTO tbl_funcionario (nome, rg, cpf, telefone, email, senha) VALUES ('${nome}', '${rg}','${cpf}', '${telefone}','${email}', '${senha}')`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
};

const buscarPeloEmail = async (email) => {
  const response =
    await prisma.$queryRaw`SELECT *  FROM tbl_funcionario WHERE email = ${email}`;

  if (response.length === 0) return false;
  return response;
};

const deleteFuncionario = async (id) => {
  const sql = `DELETE FROM tbl_funcionario WHERE id = ${id}`;
  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
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
  const sql = `UPDATE tbl_funcionario set nome = '${nome}', rg = '${rg}', 
                cpf = '${cpf}', telefone = '${telefone}', 
                email = '${email}', senha = '${senha}' WHERE id = ${id}`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  else false;
};

module.exports = {
  listarFuncionarios,
  buscarFuncionario,
  novoFuncionario,
  buscarPeloEmail,
  deleteFuncionario,
  updateFuncionario,
};
