const User = require('../models/User')
const { MongooseObject } = require("../../utils/mongoose");

class UserController {
  user(req, res, next) {
    User.find({})
      .then((User) => {
        User = User.map((User) => User.toObject());
        res.render("user", {
          showHeader: true,
          User,
        });
      })
      .catch(next);
  }
  add(req, res, next) {
    res.render("addUser", {
      showHeader: true,
    });
  }
  edit(req, res, next) {
    User.findById(req.params.id)
      .then((user) =>
        res.render("editUser", {
          user: MongooseObject(user),
          showHeader: true,
        })
      )
      .catch(next);
  }
  update(req, res, next) {
    User.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/user"))
      .catch(next);
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
  }


module.exports = new UserController();
