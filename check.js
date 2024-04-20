require("dotenv").config();
const SECRET_KEY=process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
module.exports = function check(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader != undefined) {
    const token = authHeader.split(" ")[1];
    try {
      if (jwt.verify(token, SECRET_KEY)) {
        req.user= {
          id: jwt.verify(token, SECRET_KEY).id,
          name: jwt.verify(token, SECRET_KEY).name
        };
      }
    } catch (e) {
      return res.status(400).json({
        msg: "Authentication failed"
      })
    }
  } else {
    return res.json({
      msg: "Authentication failed"
    })
  }
  next();
} 