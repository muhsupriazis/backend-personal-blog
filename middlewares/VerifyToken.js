import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next)=>{
    const auth = req.headers['authorization']
    const token = auth && auth.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
        if(error) return res.sendStatus(403)
        req.email = decoded.email
        next()
    })
}