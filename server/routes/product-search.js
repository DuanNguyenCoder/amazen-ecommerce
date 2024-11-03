const productSearchController = require("../controllers/productSearchController");

const router = require("express").Router();

router.get("/", productSearchController.productSearch);

module.exports = router;
