const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addNewUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req);

  User.findOne({ email: req.body.email })
    .then(results => {
      console.log("1111111111", results);
      if (results) {
        return res.json({ msg: "Email already in use" });
      }

      return bcrypt.hash(password, 10).then(hash => {
        return User.create({
          email: email,
          password: hash
        })
          .then(result => {
            console.log("2222222222", result);
            // res.redirect(200, "http://localhost:3000/login");
            console.log("created user");
            console.log(result);
            res.status(200).json({ msg: "success" });
          })
          .catch(err => {
            res.status(400).json({ msg: "failed" });
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
