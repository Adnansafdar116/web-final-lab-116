var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var checkSessionAuth = require("../middlewares/checkSessionAuth");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  res.render("products/list", { title: "User Products", products });
  //get products from database and show in products list
});
router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("products/add");
  // first check authentication
});
// store data in db
router.post("/add", async function (req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
  //add in product list/database
});


router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});


router.get("/cart/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  console.log("Add This Product in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(product);
  res.cookie("cart", cart);
  res.redirect("/products");
  //add in cart
});


router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
    //delete one item
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
  //edit in product list
});
router.post("/edit/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  await product.save();
  res.redirect("/products");
  //when previous work , then update/edit the database and cart
});

module.exports = router;
