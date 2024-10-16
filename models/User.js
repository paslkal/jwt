import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import pkg from 'validator'
const {isEmail} = pkg
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a vaild email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'], 
    minlength: [6, 'Minimum password lengtt is 6 characters']
  }
})
/*
userSchema.post('save', function (doc, next) {
  console.log('new user was crea ted and saved', doc)

  next()
})
*/

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({email})
  if (!user) throw Error('incorrect email')

  const auth = await bcrypt.compare(password, user.password)

  if (!auth) throw Error('incorrect password')

  return user
}

const User = mongoose.model('user', userSchema)

export default User
