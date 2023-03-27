const siteRoute = require("./site");
const userRouter = require("./user");
const productRoute = require("./product");

const route = (app) => {
  app.use("/product", productRoute);
  app.use("/user", userRouter);
  app.use("/", siteRoute);
};
module.exports = route;
