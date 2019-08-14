const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    console.log("Not authenticated");
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "lMUZxRmYp0K3dU7GRM3PKJXAFAtDgZlO");
  } catch (err) {
    console.log(err);
  }
  if (!decodedToken) {
    console.log("Not authenticated");
  }
  req.userId = decodedToken.userId;
  req.username = decodedToken.username;
  next();
};
