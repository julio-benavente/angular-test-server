const Product = require("../models/product");

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  const { id, name, price, imageLink, categories, inStock, seller } = req.body;
  const dataToUpdate = {
    name,
    price,
    imageLink,
    categories,
    inStock,
    seller,
  };

  // Validate if the value is null is going to keep the old value or
  // it is going to replace it with nul
  try {
    const productUpdated = await Product.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });
    res.json({ product: productUpdated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.body;

  try {
    const productDeleted = await Product.findByIdAndDelete(id, { new: true });
    res.json({ product: productDeleted });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, imageLink, categories, inStock } =
      req.body;
    const dataToCreateProduct = {
      name,
      description,
      price,
      imageLink,
      inStock,
      seller: req.user._id,
    };

    const productCreated = await Product.create(dataToCreateProduct);

    res.json({ product: productCreated }).status(201);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
