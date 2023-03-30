const express = require("express");
const router = express.Router();
const userController = require("../app/controller/userController");


router.get("/addUser", userController.add);
router.post("/list", userController.list);
router.get("/:id/edit", userController.edit);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.get("/", userController.user);

module.exports = router;
