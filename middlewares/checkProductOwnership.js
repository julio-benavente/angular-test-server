const Product = require("../models/product");

const checkProductOwnership = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming you have the user ID available in the request object
    const productId = req.body.id; // Assuming the product ID is passed as a route parameter

    // Assuming you have a Mongoose model called "Product"
    const product = await Product.findOne({ _id: productId, seller: userId });

    if (!product) {
      // If the product doesn't exist or doesn't belong to the user, send an error response
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = checkProductOwnership;
