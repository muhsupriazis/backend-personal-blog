import User from '../modules/UserModule.js'

export const getUser = async(req, res)=>{
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({
            message: 'something error when get user'
        })   
    }
}