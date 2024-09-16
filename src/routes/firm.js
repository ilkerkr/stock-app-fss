"use strict";

const router = require("express").Router();
const firm = require("../controllers/firm");
const permissions = require("../middlewares/permissions");
//!-----------------------------------------------------------------!//
router.use(permissions.isAdmin);

router.route("/").get(firm.list).post(firm.create);

router.route("/:id").get(firm.read).put(firm.update).delete(firm.delete);
//!-----------------------------------------------------------------!//

module.exports = router;
