const checkJWT = require("../middlewares/check-jwt");
const sellerController = require("../controllers/sellerController");
const router = require("express").Router();

router
  .route("/products")
  .get(checkJWT, sellerController.getProductSold)
  .post(
    [checkJWT, sellerController.uploadImg.single("product_picture")],
    sellerController.createProductSell
  );
module.exports = router;
