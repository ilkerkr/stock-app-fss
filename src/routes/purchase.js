"use strict";

const router = require("express").Router();
const purchase = require("../controllers/purchase");
const permissions = require("../middlewares/permissions");
//!-----------------------------------------------------------------!//

router
  .route("/")
  .get(permissions.isLogin, purchase.list)
  .post(permissions.isLogin, purchase.create);

router
  .route("/:id")
  .get(permissions.isLogin, purchase.read)
  .put(permissions.isStaff, purchase.update)
  .delete(permissions.isStaff, purchase.delete);
//!-----------------------------------------------------------------!//

module.exports = router;
