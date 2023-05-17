const router = require("express").Router();
const User = require("../../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const dataToLogin = { email, password };
    const { token } = await User.login(dataToLogin);

    res.json({ token });
  } catch (error) {
    // console.log(e);
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
