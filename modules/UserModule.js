import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    username: String,
    password: String,
    token: String
})

const User = mongoose.model('user', userSchema)
export default User