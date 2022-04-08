const upload = require('./comment/upload');

module.exports = {
  signup : require('./users/signup'),
  login : require('./users/login'),
  auth : require('./users/authorization'),
  upload : require('./comment/upload'),
  content : require('./comment/content')
}