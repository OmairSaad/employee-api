require("dotenv").config();
const SECRET_KEY=process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const set_token = function(user){
  let token;
  try{

     token = jwt.sign({
        id: user._id,
        name: user.firstName,
       }, SECRET_KEY);
  }catch(e){
   console.log("error");
  }
  return token;
}

module.exports = set_token;