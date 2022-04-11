const { User } = require('../../models');

module.exports = async (req, res) => {
  const data = req.query.query
  console.log(data)
  const image = await User.findOne({
    where : { id : data }
  })
  if (!image) {
    res.status(403).send('not exist data')
  } else {
    res.status(201).send(image.dataValues.image)
  }
}