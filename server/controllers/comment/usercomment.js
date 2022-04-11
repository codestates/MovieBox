const { User } = require('../../models')
const { Comment } = require('../../models');

module.exports = async (req, res) => {
  const userId = req.query.query
  const content = await Comment.findAll({
    where : {
      user_id : userId
    },
    include: {
      model: User,
      attributes: ['nickname']
    }
  })
  if (!userId) {
    res.status(403).send('not exist data')
  } else {
    res.status(201).send(content.map(el => el.dataValues))
  }
}