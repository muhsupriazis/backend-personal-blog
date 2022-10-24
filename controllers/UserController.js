import User from '../modules/UserModule.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const getUser = async(req, res)=>{
    try {
        const user = await User.find()
        res.status(200).json({
            _id: user[0]._id,
            username: user[0].username,
            email: user[0].email
        })
    } catch (error) {
        res.status(404).json({
            message: 'something error when get user'
        })   
    }
}
export const postUser = async (req, res)=>{
    try {
        if(req.body.password != req.body.confirm) return res.status(400).json({
            message: 'Confirm failed'
        })
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        })
        await user.save()
        res.status(201).json({
            message: 'Successfully save data'
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}
export const deleteUser = async(req, res)=>{
    try {
        await User.deleteOne({_id: req.params.id})
        res.status(202).json({
            message: 'successful delete user'
        })
    } catch (error) {
        res.send({
            message: error.message
        })
    }
}
export const login = async(req, res)=>{
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(404).json({
            message: 'Username not found'
        })
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({
            message: 'Password not match'
        })
        const {_id, username, email} = user
        const accessToken = jwt.sign({_id, username, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        })
        const refreshToken = jwt.sign({_id, username, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        })
        await User.updateOne({_id: _id}, {
            token: refreshToken
        })
        res.cookie('token', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(201).json({
            token: accessToken
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}