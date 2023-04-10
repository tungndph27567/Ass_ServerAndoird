const express = require("express");
const app = express();
const route = express.Router();
const productController = require("../app/controller/productController");
const mdw = require("../middleware/checkLogin");

var bodyParser = require("body-parser");
var multer = require("multer");
app.use(bodyParser.urlencoded({ extended: true }));
var Product = require("../app/models/Product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, "uploads/images/products");
    } else {
      cb(new Error("not image"), null);
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});
var upload = multer({ storage: storage });

route.get("/addProduct", mdw.checkLogin, productController.add);
route.put("/:id", mdw.checkLogin, productController.update);
route.delete("/:id", mdw.checkLogin, productController.destroy);

route.post("/list", upload.single("image"), async (req, res) => {
  var img = "null";
  try {
    img = req.file.filename;
  } catch (error) {
    res;
  }
  const pro = new Product({
    name: req.body.name,
    price: req.body.price,
    color: req.body.color,

    image: img,
  });
  try {
    pro.save();
    res.redirect("/product");
  } catch (error) {
    res.status(500).send(error);
  }
});

route.get("/", productController.product);

module.exports = route;
