const express = require('express');
const router = express.Router();
const siteController = require("../app/controller/siteController");
const userController = require('../app/controller/userController');
const mdw = require('../middleware/checkLogin');

router.get("/SingUp", siteController.SingUp);
router.post("/checkLogin", siteController.checkLogin);
router.get("/search", userController.search);
router.post("/list", siteController.list);
router.get("/logout", mdw.checkLogin,siteController.logout);
router.get("/",siteController.SingIn);
module.exports = router;