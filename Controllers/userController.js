const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addNewUser = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const emailQuery = User.findOne({ email });
  const userNameQuery = User.findOne({ username });

  Promise.all([emailQuery, userNameQuery])
    .then(results => {
      const userFromEmail = results[0];
      const userFromUsername = results[1];
      if (userFromEmail) {
        return res.json({ msg: "Email already in use" });
      }
      if (userFromUsername) {
        return res.json({ msg: "Username is taken" });
      }
      bcrypt
        .hash(password, 10)
        .then(hash => {
          return User.create({
            username: username,
            email: email,
            password: hash
          });
        })
        .then(result => {
          res.status(200).json({ msg: "success" });
          console.log("created user");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
      res.json({ msg: "failed" });
    });
};

exports.logIn = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    username: username
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
          username: user.username,
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
