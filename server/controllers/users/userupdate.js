const { User } = require('../../models');
const { createAccessToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  const data = req.body
  console.log(data)
  const userupdate = await User.update({
    password : data.password,
    nickname : data.nickname
  }, {
    where : { id : data.id }
  })
  console.log(userupdate)
  const accessToken = createAccessToken(data.password)
  if (!userupdate) {
    res.status(404).send('not change image')
  } else {
    res.status(201).send({message: 'ok'})
  }
}