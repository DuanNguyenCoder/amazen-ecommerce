const Product = require("../models/product");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.accessKey,
  secretAccessKey: process.env.secretKey,
});

const sellerController = {
  getProductSold: (req, res, next) => {
    Product.find({ owner: req.decoded.user._id })
      .populate("owner")
      .populate("category")
      .populate("brand")
      .exec((err, products) => {
        if (products) {
          res.json({
            success: true,
            message: "Products",
            products: products,
          });
        }
      });
  },

  uploadImg: multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.bucket,
      acl: "public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname);
      },
    }),
  }),

  createProductSell: (req, res, next) => {
    let product = new Product();
    product.owner = req.decoded.user._id;
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.location;
    product.brand = req.body.brand;
    product.save();
    res.json({
      success: true,
      message: "Successfully Added the product",
    });
  },
};

module.exports = sellerController;
