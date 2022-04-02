const { User } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const authorization = req.cookies.jwt
  const email = req.cookies.email
  console.log(authorization)
  if (!authorization) {
    res.send({data: null, message: "not authorized"})
  }
  else { 
    const accessTokenData = await isAuthorized(authorization);
    const userdata = await User.findOne({ where : {email: email, password: accessTokenData.password}})
    const userinfo = {
      email : userdata.dataValues.email,
      name : userdata.dataValues.name,
      nickname : userdata.dataValues.nickname
    }
    res.status(201).send({data: {userinfo: userinfo}})
  }
};