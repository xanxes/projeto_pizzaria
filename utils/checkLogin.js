const checkLogin = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Login é necessario");
  }

  const [, token] = authorization.split(" ");

  const dados = jwt.verify(token, "tokenSecreto");
  const { data } = dados;

  req.user = data;
  return next();
};

module.exports = { checkLogin };
