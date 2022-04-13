const { User } = require('../../models');
const { createAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const data = req.body
  const accessToken = createAccessToken(data.password)
  const userupdate = await User.update({
    password : accessToken,
    nickname : data.nickname
  }, {
    where : { id : data.id }
  })
  if (!userupdate) {
    res.status(404).send('not change image')
  } else {
    res.status(201).send({message: 'ok'})
  }
}