"use strict";

const router = require("express").Router();
const sale = require("../controllers/sale");
const permissions = require("../middlewares/permissions");
//!-----------------------------------------------------------------!//

router
  .route("/")
  .get(permissions.isLogin, sale.list)
  .post(permissions.isLogin, sale.create);

router
  .route("/:id")
  .get(permissions.isLogin, sale.read)
  .put(permissions.isStaff, sale.update)
  .delete(permissions.isStaff, sale.delete);
//!-----------------------------------------------------------------!//

module.exports = router;
