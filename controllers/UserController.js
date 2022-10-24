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

export const postUser = async (req, res)=>{
    try {
        if(req.body.password != req.body.confirm) return res.status(400).json({
            message: 'Confirm failed'
        })
        const user = new User({
            username: req.body.username,
            password: req.body.password,
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
        
    }
}