const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addNewAdmin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({ email })
    .then(results => {
      if (results) {
        return res.json({ msg: "Email already in use" });
      }
      bcrypt
        .hash(password, 10)
        .then(hash => {
          return Admin.create({
            email: email,
            password: hash
          });
        })
        .then(result => {
          res.status(200).json({ msg: "success" });
          console.log("created admin");
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
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({
    email: email
  })
    .then(admin => {
      if (!admin) {
        return res.json({ msg: "User not found" });
      }
      bcrypt
        .compare(password, admin.password)
        .then(result => {
          res.json({ msg: "Login Successful" });
        })
        .catch(err => console.log(err));
      const token = jwt.sign(
        {
          adminId: admin._id.toString()
        },
        "lMUZxRmYp0K3dU7GRM3PKJXAFAtDgZlO",
        { expiresIn: "24h" }
      );
      res.status(200).json({ token: token, adminId: admin._id.toString() });
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      res
        .status(401)
        .json({ msg: "Login failed check credentials and try again" });
    });
};
