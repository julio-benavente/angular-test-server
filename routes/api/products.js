const router = require("express").Router();

// Middlewares
const productControllers = require("../../controllers/products");
const authenticateToken = require("../../middlewares/authenticateToken");
const checkProductOwnership = require("../../middlewares/checkProductOwnership");

// Routes
router.get("/", authenticateToken, productControllers.getProducts);
router.patch(
  "/",
  authenticateToken,
  checkProductOwnership,
  productControllers.updateProduct
);
router.delete(
  "/",
  authenticateToken,
  checkProductOwnership,
  productControllers.deleteProduct
);
router.post("/", authenticateToken, productControllers.createProduct);

module.exports = router;
