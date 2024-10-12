import User from "../models/User.js"
import jwt from 'jsonwebtoken'

const handleErrors = (error) => {
  let errors = {email: '', password: ''}

  if (error.code === 11000) {
    errors.email = 'That email is already registered'
    return errors
  }

  if (error.message.includes('user validation failed')) 
    Object.values(error.errors).forEach(({properties}) => 
      errors[properties.path] = properties.message  
    )

  return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({id}, 'paslkal secret', {
    expiresIn: maxAge
  })
}

export function signupGet(req, res) {
  res.render('signup')
}

export function loginGet(req, res) {
  res.render('login')
}

export async function signupPost(req, res) {
  const {email, password} = req.body

  try {
    const user = await User.create({email, password})
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({userId: user._id})    
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors})
  }
}

export async function loginPost(req, res) {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)
    
    res.status(200).json({userId: user._id})
  } catch (error) {
    console.error(error)

    res.status(400).json({})
  }
}

