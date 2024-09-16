"use strict";

const router = require("express").Router();
const category = require("../controllers/category");
const permissions = require("../middlewares/permissions");
//!-----------------------------------------------------------------!//

router.use(permissions.isAdmin)

router.route("/").get(category.list).post(category.create);

router
  .route("/:id")
  .get(category.read)
  .put(category.update)
  .delete(category.delete);
//!-----------------------------------------------------------------!//

module.exports = router;
