const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    jwt.verify(token, process.env.JWT_KEY, async (err, tokenDecrypted) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden" });
      }

      const user = await User.findOne(
        { email: tokenDecrypted.data.email },
        { email: 1 }
      );

      req.user = user;

      next();
    });
  } catch (error) {
    return res.status(404).json({ error: "An error occured" });
  }
};

module.exports = authenticateToken;
