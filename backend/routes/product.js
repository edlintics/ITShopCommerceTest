const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//set the path of router and corresponding controller
router.route("/products").get(getProducts);

router.route("/admin/product/new").post(newProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct); // for the same route, based on teh request, we modify with the selected id product

module.exports = router;
