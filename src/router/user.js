const express = require("express");
const router = express.Router();
const userController = require("../app/controller/userController");
const mdw = require("../middleware/checkLogin");

router.get("/addUser", mdw.checkLogin, userController.add);
router.post("/list", mdw.checkLogin, userController.list);
router.get("/:id/edit", mdw.checkLogin, userController.edit);
router.put("/:id", mdw.checkLogin, userController.update);
router.delete("/:id", mdw.checkLogin, userController.destroy);
router.get("/", mdw.checkLogin, userController.user);

module.exports = router;
