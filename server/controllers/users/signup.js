const { use } = require('chai');
const { User } = require('../../models');
const { createAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const [userinfo, created] = await User.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      nickname: req.body.nickname
    }
  })
  const accessToken = createAccessToken(userinfo.dataValues.password)
  console.log(accessToken)
  if (!created) {
    res.status(403).send('already exist email')
  } else {
    res.cookie('jwt', accessToken)
    res.cookie('email', userinfo.email)
    res.status(201).send({message: 'ok', email: userinfo.email, password: accessToken})
  }
}