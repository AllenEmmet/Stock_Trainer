const jwt = require("jsonwebtoken");
const Secret = process.env.FIRST_SECRET_KEY;

module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) { 
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
}

