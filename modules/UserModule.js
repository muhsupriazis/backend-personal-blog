import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    token: String
})

const User = mongoose.model('user', userSchema)
export default User