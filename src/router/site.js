const express = require('express');
const router = express.Router();
const siteController = require("../app/controller/siteController");

router.get("/SingUp", siteController.SingUp);
router.post("/checkLogin", siteController.checkLogin);
router.post("/list", siteController.list);
router.get("/",siteController.SingIn);
module.exports = router;