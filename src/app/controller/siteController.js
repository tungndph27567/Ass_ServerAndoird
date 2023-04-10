const User = require("../models/User");
const bcrypt = require("bcrypt");
const request = require("request");

class SiteController {
  SingIn(req, res) {
    res.render("SingIn", {
      showHeader: false,
    });
  }

  // [POST] Login
  async checkLogin(req, res, next) {
    let msg = "";
    try {
      let objU = await User.findOne({ email: req.body.email });
      if (objU) {
        let checkPass = await bcrypt.compare(req.body.password, objU.password);
        if (checkPass) {
          req.session.userLogin = objU;
          res.cookie("roleUser", objU.role);
          if (objU.role == "user") {
            res.redirect("/product");
          } else {
            res.redirect("/user");
          }
        } else {
          msg = "Mat khau khong chinh xac";

          res.render("SingIn", { msg });
        }
      } else {
        msg = "Email dang ky khong ton tai";
        res.render("SingIn", { msg });
      }
    } catch (error) {
      msg = error.message;
    }
  }
  SingUp(req, res) {
    res.render("SingUp");
  }

  async list(req, res, next) {
    let msg = "";
    try {
      let objCheck = await User.findOne({ email: req.body.email });
      if (objCheck) {
        msg = "Email đã được đăng ký";
        return res.render("SingUp", { msg });
      }
    } catch (error) {
      msg = "Lỗi: " + error.message;
    }
    if (req.body.password != req.body.password2) {
      msg = "Xac nhan mat khau khong chinh xac";
      return res.render("SingUp", { msg });
    }
    try {
      let objU = await new User();
      objU.email = req.body.email;
      objU.firstname = req.body.firstname;
      objU.lastname = req.body.lastname;

      const salt = await bcrypt.genSalt(15);
      objU.password = await bcrypt.hash(req.body.password, salt);
      await objU.save();
      res.redirect("/");
    } catch (error) {
      msg = "Lỗi: " + error.message;
    }

    res.render("SingUp", {
      msg,
    });
  }
  logout(req, res, next) {
    if (req.session != null)
      req.session.destroy(function () {
        console.log("Đăng xuất thành công");
        res.redirect("/");
      });
  }
}
module.exports = new SiteController();
