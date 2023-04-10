const Product = require("../models/Product");
var multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (
//       file.mimetype === "image/jpg" ||
//       file.mimetype === "image/jpeg" ||
//       file.mimetype === "image/png"
//     ) {
//       cb(null, "./uploads");
//     } else {
//       cb(new Error("not image"), null);
//     }
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + ".jpg");
//   },
// });
// var upload = multer({ storage: storage });
class ProductController {
  // [GET] /prodcut
  product(req, res, next) {
    const roleUser = req.cookies.roleUser;
    Product.find({}).then((product) => {
      product = product.map((product) => product.toObject());
      res.render("product", {
        showHeader: true,
        product,
        roleUser
      });
    });
  }
  // [GET] /product/addProduct
  add(req, res, next) {
    const roleUser = req.cookies.roleUser;
    res.render("addProduct", {
      showHeader: true,
      roleUser
    });
  }

  // [POST] /product/list
  async list(req, res, next) {
    var img = "null";
    try {
      img = req.file.filename;
    } catch (error) {}
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
  }
  // [PUT] /product/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /product/:id
  destroy(req, res, next) {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
}

module.exports = new ProductController();
