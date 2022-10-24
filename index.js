import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import routerUser from './routes/UserRoute.js'
dotenv.config()
mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.DB_NAME}`)
.then(()=>console.log(`database connected`))
.catch(()=>console.log(`database unconnected`))
const app = express()
app.use('/api/user', routerUser)
app.listen(process.env.PORT, ()=>{
    console.log(`application running in http://localhost:${process.env.PORT}/api`)
})

