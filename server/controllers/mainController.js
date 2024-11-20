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
  getProductById: (req, res, next) => {
    Product.findById({ _id: req.params.id })
      .populate("category")
      .populate("owner")
      .populate("brand")
      .deepPopulate("reviews.owner")
      .exec((err, product) => {
        if (err) {
          res.json({
            success: false,
            message: "Product is not found",
          });
        } else {
          if (product) {
            res.json({
              success: true,
              product: product,
            });
          }
        }
      });
  },
  createReview: (req, res, next) => {
    async.waterfall([
      function (callback) {
        Product.findOne({ _id: req.body.productId }, (err, product) => {
          if (product) {
            callback(err, product);
          }
        });
      },
      function (product) {
        let review = new Review();
        review.owner = req.decoded.user._id;

        if (req.body.title) review.title = req.body.title;
        if (req.body.description) review.description = req.body.description;
        review.rating = req.body.rating;

        product.reviews.push(review._id);
        product.save();
        review.save();
        res.json({
          success: true,
          message: "Successfully added the review",
        });
      },
    ]);
  },

  createPayment: async (req, res, next) => {
    dataProductSave = req.body.products;
    dataProductSave["totalPrice"] = req.body.totalPrice;
    dataPayFormat = [];
    for (product of req.body.products) {
      const productFind = await Product.findOne({ _id: product.id });

      const formatProductStripe = {
        price_data: {
          currency: "usd",
          product_data: {
            name: productFind.title,
          },
          unit_amount: Math.round(productFind.price * 100),
        },
        quantity: product.quantity,
      };
      dataPayFormat.push(formatProductStripe);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: dataPayFormat,
      mode: "payment",
      success_url: `${process.env.clientUrl}payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:4200/cancel",
    });

    res.json({ url: session.url });
  },
  verifyPay: async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    if (session.payment_status === "paid") {
      console.log(dataProductSave);
      let order = new Order();
      order.owner = req.decoded.user._id;
      order.totalPrice = dataProductSave.totalPrice;

      dataProductSave.map((product) => {
        order.products.push({
          product: product.id,
          quantity: product.quantity,
        });
      });
      order.save();

      res.json({ success: true, message: "Payment verified and saved." });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment not completed." });
    }
  },
};
module.exports = mainController;
