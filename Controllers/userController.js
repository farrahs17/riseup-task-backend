const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addNewUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(results => {
      console.log(results);
      if (results) {
        return res.json({ msg: "Email already in use" });
      }
      bcrypt.hash(password, 10).then(hash => {
        return User.create({
          email: email,
          password: hash
        })
          .then(result => {
            res.status(200).json({ msg: "success" });
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.logIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email: email
  })
    .then(user => {
      if (!user) {
        return res.json({ msg: "User not found" });
      }
      bcrypt
        .compare(password, user.password)
        .then(result => {
          res.json({ msg: "Login Successful" });
        })
        .catch(err => console.log(err));
      const token = jwt.sign(
        {
          userId: user._id.toString()
        },
        "lMUZxRmYp0K3dU7GRM3PKJXAFAtDgZlO",
        { expiresIn: "24h" }
      );

      res.status(200).json({ token: token, userId: user._id.toString() });
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      res
        .status(401)
        .json({ msg: "Login failed check credentials and try again" });
    });
};
