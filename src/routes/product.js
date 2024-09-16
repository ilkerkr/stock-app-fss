"use strict";

const router = require("express").Router();
const product = require("../controllers/product");
const permissions = require("../middlewares/permissions");
//!-----------------------------------------------------------------!//

router.use(permissions.isStaff);

router.route("/").get(product.list).post(product.create);

router
  .route("/:id")
  .get(product.read)
  .put(product.update)
  .delete(product.delete);
//!-----------------------------------------------------------------!//

module.exports = router;
