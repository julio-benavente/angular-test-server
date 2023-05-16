const jwt = require("jsonwebtoken");

const createJWT = (
  data,
  expiresIn = 1000 * 60 * 60 * 24,
  tokenKey = process.env.JWT_KEY
) => {
  const token = jwt.sign({ data: data }, tokenKey, { expiresIn });

  return token;
};

module.exports = createJWT;
