const { Comment } = require('../../models');

module.exports = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    user_id: req.body.user_id,
    movie_id: req.body.movie_id
  })
  if (!comment) {
    res.status(403).send('not exist data')
  } else {
    res.status(201).send({message: 'ok'})
  }
}