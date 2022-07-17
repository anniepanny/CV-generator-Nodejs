const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");

module.exports.register = (req, res) => {
  const user = new User({
    full_Name: req.body.full_Name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 7),
  });
  user.save((err, user) => {
    if (err) {
      if(err.code === 11000) return res.status(400).send({message: "user already exist"});
      console.log(err);
    } else {
      res.status(200).send({ message: "  Registration successful" });
    }
  });
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (user === null)
    return res.status(400).send({ message: "user not found!" });
  const isValidPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!isValidPassword)
    return res.status(400).send({ message: "user does not exist." });
  //login  token with user id
  var token = jwt.sign(
    {
      id: user.id,
    },
   "asdf",
    {
      expiresIn: "60min",
    }
  );
  // responding to clint request with user profile sucessfully
  res.status(200).send({
    accessToken: token,
    user
  });
};