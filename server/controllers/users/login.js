const { User } = require('../../models');
const { createAccessToken, sendAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  // cookie가 생성이 안됨!
  const userinfo = await User.findOne({
    where : { email : req.body.email, password : req.body.password }
  })
  if (!userinfo) {
    return res.status(404).send('invalid password')
  } else {
    const accessToken = createAccessToken(userinfo.dataValues.password)
    sendAccessToken(res, accessToken, userinfo.dataValues)
  }
};
