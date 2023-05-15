const router = require("express").Router();

// Models
const Product = require("../../models/product");
// const Order = require("../../models/Order");

// Middleware and utils
// const auth = require("../../middlewares/auth");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, imageLink, categories, inStock, seller } = req.body;
  const dataToUpdate = { name, price, imageLink, categories, inStock, seller };

  // Validate if the value is null is going to keep the old value or
  // it is going to replace it with nul
  try {
    const productUpdated = await Product.findByIdAndUpdate(id, dataToUpdate);
    res.json({ product: productUpdated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const productDeleted = await Product.findByIdAndDelete(id);
    res.json({ product: productDeleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, prices } = req.body;
  try {
    const { name, price, imageLink, categories, inStock, seller } = req.body;
    const dataToCreate = {
      name,
      price,
      imageLink,
      categories,
      inStock,
      seller,
    };

    const productCreated = await new Product.create(dataToCreate);
    res.json({ product: productCreated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
