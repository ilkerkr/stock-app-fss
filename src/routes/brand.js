"use strict";

const router = require("express").Router();
const brand = require("../controllers/brand");
const permissions = require("../middlewares/permissions");
//!-----------------------------------------------------------------!//
router.use(permissions.isAdmin);

router.route("/").get(brand.list).post(brand.create);

router.route("/:id").get(brand.read).put(brand.update).delete(brand.delete);
//!-----------------------------------------------------------------!//

module.exports = router;
