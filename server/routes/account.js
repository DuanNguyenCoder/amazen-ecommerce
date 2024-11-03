const router = require("express").Router();
const checkJWT = require("../middlewares/check-jwt");
const accountController = require("../controllers/accountController");

router.post("/signup", accountController.signup);

router.post("/login", accountController.getLogin);

router
  .route("/profile")
  .get(checkJWT, accountController.getProfile)
  .post(checkJWT, accountController.updateProfile);

router
  .route("/address")
  .get(checkJWT, accountController.getAddress)
  .post(checkJWT, accountController.updateAddress);

router.get("/orders", checkJWT, accountController.getOrders);

router.get("/orders/:id", checkJWT, accountController.getOrderById);

module.exports = router;
