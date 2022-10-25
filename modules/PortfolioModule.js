import mongoose, { Schema } from 'mongoose'
const portfolioSchema = new Schema({
    name: String,
    description: String,
    tools: Array,
    github : String,
    deploy: String,
    imgName: String,
    imgUrl: String
})
const Portfolio = mongoose.model('portfolio', portfolioSchema)
export default Portfolio