import jwt from "jsonwebtoken";

function requireAuth(req, res, next) {
  const token = req.cookies.jwt

  if (!token) {
    res.redirect('/login')
    return
  }

  jwt.verify(token, 'paslkal secret', (err, decodedToken) => {
    if (!err) {
      console.log(decodedToken)
      next()
      return
    } 

    console.log(err.message)
    res.redirect('/login')
  })
}

export default requireAuth