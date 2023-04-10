const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken"); //  Cần chạy lệnh cài đặt: npm install jsonwebtoken --save
chuoi_ky_tu_bi_mat = "jhdkjasdhaskjdh2384234876";
const user = new Schema({
  email: { type: String },
  password: { type: String, min: 6 },
  firstname: { type: String, min: 1 },
  lastname: { type: String, min: 1 },
  role: { type: String, default: "user" },
  token: {
    // trường hợp lưu nhiều token thì phải dùng mảng. Trong demo này sẽ dùng 1 token
    type: String,
    required: false,
  },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

user.methods.generateAuthToken = async function () {
  const user = this;
  console.log(user);
  const token = jwt.sign(
    { _id: user._id, email: user.email },
    chuoi_ky_tu_bi_mat
  );
  // user.tokens = user.tokens.concat({token}) // code này dành cho nhiều token, ở demo này dùng 1 token
  user.token = token;
  await user.save();
  return token;
};

user.statics.findByCredentials = async (username, passwd) => {
  const user = await userModel.findOne({ username });
  if (!user) {
    throw new Error({ error: "Không tồn tại user" });
  }
  const isPasswordMatch = await bcrypt.compare(passwd, user.passwd);
  if (!isPasswordMatch) {
    throw new Error({ error: "Sai password" });
  }
  return user;
};
module.exports = mongoose.model("uers", user);
