import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import routerUser from './routes/UserRoute.js'
import routerAuth from './routes/AuthRoute.js'
import routerPortfolio from './routes/PortfolioRoute.js'
dotenv.config()
mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.DB_NAME}`)
.then(()=>console.log(`database connected`))
.catch(()=>console.log(`database unconnected`))
const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(fileUpload())
app.use('/api/auth', routerAuth)
app.use('/api/user', routerUser)
app.use('/api/portfolios', routerPortfolio)
app.listen(process.env.PORT, ()=>{
    console.log(`application running in http://localhost:${process.env.PORT}/api`)
})

