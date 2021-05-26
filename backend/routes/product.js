const express = require("express");
const router = express.Router();

const { getProducts } = require("../controllers/productController");

//set the path of router and corresponding controller
router.route("/products").get(getProducts);

module.exports = router;
