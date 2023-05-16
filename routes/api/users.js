const router = require("express").Router();

// Models
const User = require("../../models/user");
// const Order = require("../../models/Order");

// Middleware and utils
// const auth = require("../../middlewares/auth");

router.patch("/", async (req, res) => {
  const { id, email, password } = req.body;
  const dataToUpdate = { email, password };

  // Validate if the value is null is going to keep the old value or
  // it is going to replace it with nul
  try {
    const userUpdated = await User.findByIdAndUpdate(id, dataToUpdate);
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/registration", async (req, res) => {
  try {
    const { email, password } = req.body;
    const dataToCreateUser = { email, password };

    const userCreated = await User.create(dataToCreateUser);
    // console.log({ userCreated });
    res.json({ success: true }).status(201);
  } catch (e) {
    // console.log(e);
    // const error = handleError(e);
    res.status(400).json({ e: e.message });
  }
});

module.exports = router;
