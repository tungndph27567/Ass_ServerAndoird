const User = require("../models/User");
const { MongooseObject } = require("../../utils/mongoose");
const bcrypt = require("bcrypt");

class UserController {
  user(req, res, next) {
    const roleUser = req.cookies.roleUser;

    const PAGE_SIZE = 5;
    var page = req.query.page;
    const soLuongBoQua = (page - 1) * PAGE_SIZE;
    if (page) {
      page = parseInt(page);
      if (page < 1) {
        page = 1;
      }
    }
    User.find({})
      .skip(soLuongBoQua)
      .limit(PAGE_SIZE)
      .then((user) => {
        user = user.map((user) => user.toObject());
        User.countDocuments({}).then((count) => {
          const soPage = Math.ceil(count / PAGE_SIZE);
          res.render("user", {
            user,
            count,
            soPage,
            roleUser,
            showHeader: true,
          });
        });
      });

    // Promise.all([
    //   User.find({}).skip(soLuongBoQua).limit(PAGE_SIZE),
    //   User.countDocuments({}),
    // ])
    //   .then(([User, countUser]) => {
    //     res.render("user", {
    //       showHeader: true,
    //       User: User.map((User) => User.toObject()),
    //       countUser
    //     });
    //     console.log(countUser);
    //   })
    //   .catch(next);
  }

  add(req, res, next) {
    res.render("addUser", {
      showHeader: true,
    });
  }
  edit(req, res, next) {
    User.findById(req.params.id)
      .then((user) => {
        const objU = MongooseObject(user);
        var role = objU.role;
        res.render("editUser", {
          objU,
          showHeader: true,
          role,
        });
      })
      .catch(next);
  }
  async update(req, res, next) {
    // User.updateOne({ _id: req.params.id }, req.body)
    //   .then(() => res.redirect("/user"))
    //   .catch(next);
    let msg = "";
    try {
      let objU = await User.findById({ _id: req.params.id });
      objU.email = req.body.email;
      objU.firstname = req.body.firstname;
      objU.lastname = req.body.lastname;
      objU.role = req.body.role;
      const salt = await bcrypt.genSalt(15);
      objU.password = await bcrypt.hash(req.body.password, salt);
      await User.updateOne({ _id: req.params.id }, objU);
      res.redirect("/user");
    } catch (error) {
      msg = "Lỗi: " + error.message;
    }
  }
  destroy(req, res, next) {
    User.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  list(req, res, next) {
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res.redirect("/user");
      })
      .catch((err) => {});
  }
  search(req, res) {
    const PAGE_SIZE = 5;
    var page = req.query.page;
    const soLuongBoQua = (page - 1) * PAGE_SIZE;
    if (page) {
      page = parseInt(page);
      if (page < 1) {
        page = 1;
      }
    }
    const lastname = req.query.lastname.trim();
    User.find({ lastname: { $regex: lastname } })
      .skip(soLuongBoQua)
      .limit(PAGE_SIZE)
      .then((user) => {
        User.count({ lastname: { $regex: lastname } }).then((count) => {
          const soPage = Math.ceil(count / PAGE_SIZE);
          res.render("searchUser", {
            user: user.map((user) => user.toObject()),
            showHeader: true,
            soPage,
            lastname,
          });
        });
      });
  }
}

module.exports = new UserController();
