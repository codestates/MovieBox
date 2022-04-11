const { User } = require('../../models')
const { Comment } = require('../../models');

module.exports = async (req, res) => {
  const movie = req.query.query.replace(/<b>/gi,"").replace(/<\/b>/gi,"")
  const content = await Comment.findAll({
    where : {
      movie_id : movie
    },
    include: {
      model: User,
      attributes: ['nickname', 'image']
    }
  })
  if (!movie) {
    res.status(403).send('not exist data')
  } else {
    res.status(201).send(content.map(el => el.dataValues))
  }
}