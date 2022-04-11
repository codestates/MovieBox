const { User } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.query.query
  console.log(userId)
  const userinfo = await User.destroy({
    where : { id: userId }
  })
  if (!userinfo) {
    res.status(404).send('invalid password')
  } else {
    res.status(201).send({message : 'ok'})
  }
};
