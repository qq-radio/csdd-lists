const jwt = require('jsonwebtoken')

const jwtKey = 'token_test'
const jwtSign = (data) => {
  const token = jwt.sign(data, jwtKey, { expiresIn: 60 * 6000000000 })
  return token
}

const jwtCheck = (req, res, next) => {
  const token = req.headers.authorization
  jwt.verify(token, jwtKey, (err, data) => {
    if (err) {
      res.send({ status: '10086', msg: 'token无效或已过期', err: err })
    } else {
      req.jwtInfo = data
      next()
    }
  })
}

module.exports = {
  jwtSign,
  jwtCheck
}
