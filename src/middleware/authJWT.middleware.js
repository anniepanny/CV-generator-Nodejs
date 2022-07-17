const jwt = require("jsonwebtoken");
const db = require("../models/user.js");

const verifyToken = (req, res, next) => {
  if (req?.headers?.authorization?.split(" ")[0] === "JWT") {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      "asdf",
      function (err, decode) {
        if (err) {
          return res.status(400).send(err);
        }
        db.findOne({
          id: decode.id,
        }).exec((err, user) => {
          if (err) {
            res.status(500).send({ message: "not found" });
          } else {
            req.user = user;
            next();
          }
        });
      }
    );
  } else {
    return res.status(400).send({ message: "invalid user" });
  }
};
module.exports = verifyToken;