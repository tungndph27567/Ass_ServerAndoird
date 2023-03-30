const Product = require("../models/Product");
class ProductController {
  // [GET] /prodcut
  product(req, res, next) {

    Product.find({}).then((product) => {
      product = product.map((product) => product.toObject());
      
      res.render("product", {
        showHeader: true,
        product,
      });
      
    });
  }
  // [GET] /product/addProduct
  add(req, res, next) {
    res.render("addProduct", {
      showHeader: true,
    });
  }

  // [POST] /product/list
  list(req, res, next) {
    const product = new Product(req.body);
    product
      .save()
      .then(() => {
        res.redirect("/product");
      })
      .catch((err) => {});
  }
  // [PUT] /product/:id
  update(req, res, next) {
    Product.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }
  // [DELETE] /product/:id
  destroy(req, res, next) {
    Product.deleteOne({_id: req.params.id})
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new ProductController();
