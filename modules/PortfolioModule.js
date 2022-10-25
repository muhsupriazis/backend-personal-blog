import mongoose, { Schema } from 'mongoose'
const portfolioSchema = new Schema({
    companyName: String,
    description: String,
    tools: Array,
    github : String,
    deploy: String,
    imgUrl: String
})
const Portfolio = mongoose.model('portfolio', portfolioSchema)
export default Portfolio