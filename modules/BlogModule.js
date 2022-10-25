import mongoose, { Schema } from "mongoose";
const blogSchema = new Schema(
    {
    title: String,
    summary: String,
    slug: String,
    author: String,
    body: String
    },
    {
        timestamps: true
    }
)

const Blog = mongoose.model('Blog', blogSchema)

export default Blog