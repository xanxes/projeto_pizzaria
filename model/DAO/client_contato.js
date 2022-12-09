const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const insertMensagem = async ({
  nome,
  email,
  tipo_mensagem,
  mensagem,
  telefone,
  celular,
}) => {
  const sql = `INSERT INTO tbl_cliente_contato (nome,
        email,
        tipo_mensagem,
        mensagem,
        telefone,
        celular) VALUES ('${nome}', '${email}', ${tipo_mensagem}, '${mensagem}', '${telefone}', '${celular}')`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
};

const deleteMensagem = async (id) => {
  const sql = `DELETE from tbl_cliente_contato where id = ${id}`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
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
  const sql = `UPDATE tbl_cliente_contato 
  set nome = '${nome}',
    email = '${email}',
    tipo_mensagem = ${tipo_mensagem},
    mensagem = '${mensagem}',
    telefone = '${telefone}',
    celular = '${celular}'
    WHERE id = ${id}`;

  const response = await prisma.$executeRawUnsafe(sql);

  if (response) return true;
  return false;
};

const buscarMensagem = async (id) => {
  const response =
    await prisma.$queryRaw`SELECT * FROM tbl_cliente_contato where id = ${id}`;

  if (response.length === 0) return false;
  return response;
};

const listarMensagem = async () => {
  const response = await prisma.$queryRaw`SELECT * FROM tbl_cliente_contato`;

  if (response.length === 0) return false;
  return response;
};

module.exports = {
  listarMensagem,
  buscarMensagem,
  insertMensagem,
  updateMensagem,
  deleteMensagem,
};
