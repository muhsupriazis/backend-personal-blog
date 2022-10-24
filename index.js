import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import routerUser from './routes/UserRoute.js'
import routerAuth from './routes/AuthRoute.js'
dotenv.config()
mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.DB_NAME}`)
.then(()=>console.log(`database connected`))
.catch(()=>console.log(`database unconnected`))
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/api/user', routerUser)
app.use('/api/auth', routerAuth)
app.listen(process.env.PORT, ()=>{
    console.log(`application running in http://localhost:${process.env.PORT}/api`)
})

