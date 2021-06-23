//This help to save time in order to push all producst to the mongodb from producst list

const Product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/product.json"); // list of pre-existing products

// Setting dotenv ile
dotenv.config({ path: "backend/config/config.env" });

connectDatabase(); // cnnect with the MongoDB Database

const seedProducts = async () => {
  try {
    // since there was flaw data, we empty out the whole database
    await Product.deleteMany();
    console.log(" Products are deleted");

    // insert the new data from the preexisting list
    await Product.insertMany(products);
    console.log("All Products are added");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
