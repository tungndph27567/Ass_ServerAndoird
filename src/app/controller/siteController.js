const User = require("../models/User");

class SiteController {
  SingIn(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    res.render("SingIn", {
      showHeader: false,
     
    });
  }

  checkLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
      email,
      password,
    })
      .then((data) => {
        if (data) {
          res.redirect("/user");
        } else {
          res.render('SingIn',{
            title:"Tài khoản hoặc mật khẩu không chính xác"
          })
        }
      })
      .catch((err) => {
        res.status(500).json("CO LOI");
      });
  }
  SingUp(req, res) {
    res.render("SingUp");
  }
  list(req, res, next) {
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {});
  }
}
module.exports = new SiteController();
