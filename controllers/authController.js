import User from "../models/User.js"

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
    res.status(201).json(user)    
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors})
  }
}

export function loginPost(req, res) {
  const {email, password} = req.body

  res.send('user login')
}

