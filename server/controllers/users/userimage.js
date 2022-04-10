const { User } = require('../../models');

module.exports = async (req, res) => {
  const data = req.body
  console.log(data)
  const userimage = await User.update({
    image : data.image
  }, {
    where : { id : data.id }
  })
  
  if (!userimage) {
    res.status(404).send('not change image')
  } else {
    res.status(201).send({message: 'ok'})
  }
}