import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
export const refreshToken = async(req, res)=>{
    try {
        const token = req.cookies.token
        if(!token) return res.sendStatus(401)
        const user = await User.findOne({token:token})
        if(!user) return res.sendStatus(403)
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded)=>{
            if(error) return res.sendStatus(403)
            const {_id, username, email} = user
            const accessToken = jwt.sign({_id, username, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            })
            res.status(200).json({
                token: accessToken
            })
        })
    } catch (error) {
        
    }
}
export const deleteToken = async(req, res)=>{
    try {
        const token = req.cookies.token
        if(!token) return res.sendStatus(204)
        const user = await User.findOne({token:token})
        if(!user) return res.sendStatus(204)
        const _id = user._id
        await User.updateOne({_id:_id},{
            token: null
        })
        res.clearCookie('token')
        res.status(200).json({
            message: 'Logout Successfful'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}