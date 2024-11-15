const async = require("async");
const stripe = require("stripe")(
  "sk_test_51QrFBYGHMlFXVQaaPjmszOMbNY5MXup2NEqXUPM3D4yUXbi7l5EW9oop5YRue00SwlwQy7Rn19KOXEZcqJwk0wQk00HdcSScnN"
);

const Category = require("../models/category");
const Product = require("../models/product");
const Review = require("../models/review");
const Order = require("../models/order");
const brand = require("../models/brand");
const category = require("../models/category");
var dataProductSave = {};
const mainController = {
  getProducts: (req, res, next) => {
    const perPage = 5;
    const page = req.query.page;
    console.error(page);
    async.parallel(
      [
        function (callback) {
          Product.count({}, (err, count) => {
            var totalProducts = count;
            callback(err, totalProducts);
          });
        },
        function (callback) {
          Product.find({})
            .skip(perPage * page)
            .limit(perPage)
            .populate("category")
            .populate("owner")
            .populate("brand")
            .exec((err, products) => {
              if (err) return next(err);
              callback(err, products);
            });
        },
      ],
      function (err, results) {
        var totalProducts = results[0];
        var products = results[1];

        res.json({
          success: true,
          message: "category",
          products: products,
          totalProducts: totalProducts,
          pages: Math.ceil(totalProducts / perPage),
        });
      }
    );
  },
  getBrands: (req, res, next) => {
    brand.find({}, (err, brands) => {
      res.json({
        success: true,
        message: "Success",
        brands: brands,
      });
    });
  },
  addBrands: (req, res, next) => {
    let b = new brand();
    b.name = req.body.brand;
    b.save();
    res.json({
      success: true,
      message: "Successful",
    });
  },
  getCategory: (req, res, next) => {
    category.find({}, (err, categories) => {
      res.json({
        success: true,
        message: "Success",
        categories: categories,
      });
    });
  },
  addCategory: (req, res, next) => {
    let c = new category();
    c.name = req.body.category;
    c.save();
    res.json({
      success: true,
      message: "Successful",
    });
  },
};
module.exports = mainController;
