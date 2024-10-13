import jwt from "jsonwebtoken";
import User from "../models/User.js";

export function requireAuth(req, res, next) {
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

export function checkUser(req, res, next) {
  const token = req.cookies.jwt
  
  res.locals.user = null

  if (!token) {
    res.redirect('/login')
    next()
    return
  }

  jwt.verify(token, 'paslkal secret', async (err, decodedToken) => {
    if (!err) {
      console.log(decodedToken)

      try {
        let user = await User.findById(decodedToken.id)
        res.locals.user= user
        next()
        return        
      } catch (error) {
        console.log(error)
        next()
        return
      }
      
    }

    console.log(err.message)
    next()
  }) 

  console.log(`USER: ${res.locals.user}`)
}