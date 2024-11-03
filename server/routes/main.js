const router = require("express").Router();

const checkJWT = require("../middlewares/check-jwt");
const mainController = require("../controllers/mainController");

router.get("/products", mainController.getProducts);
router
  .route("/brands")
  .get(mainController.getBrands)
  .post(mainController.addBrands);

router
  .route("/categories")
  .get(mainController.getCategory)
  .post(mainController.addCategory);

router.get("/product/:id", mainController.getProductById);

router.post("/review", checkJWT, mainController.createReview);

router.post("/payment", checkJWT, mainController.createPayment);

router.post("/verify-payment", checkJWT, mainController.verifyPay);

module.exports = router;
