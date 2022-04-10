const upload = require('./comment/upload');

module.exports = {
  signup : require('./users/signup'),
  login : require('./users/login'),
  logout: require('./users/logout'),
  auth : require('./users/authorization'),
  upload : require('./comment/upload'),
  content : require('./comment/content'),
  userimage : require('./users/userimage'),
  getimage : require('./users/getimage'),
  usercomment : require('./comment/usercomment')
}