import mongoose, { Schema } from 'mongoose'
const certificateSchema = new Schema({
    name: String,
    description: String,
    github : String,
    imgName: String,
    imgUrl: String
})
const Certificate = mongoose.model('certificate', certificateSchema)
export default Certificate