import Blog from '../models/BlogModel.js'
export const getBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find()
        if(blogs.length < 1) return res.status(404).json({
            message: 'Data empty'
        })
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const getBlog = async (req, res)=>{
    try {
        const blog = await Blog.findById({_id : req.params._id})
        if(!blog) return res.status(404).json({
            message: 'Blog not found'
        })
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const postBlog = async (req, res)=>{
    try {
        const {title, summary, slug, author, body} = req.body
        const blog = new Blog({
            title, summary, slug, author, body
        })
        await blog.save()
        res.status(201).json({
            message: 'Successfully save data'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const updateBlog = async (req, res)=>{
    try {
        const blog = await Blog.findById({_id : req.params._id})
        if(!blog) return res.status(404).json({
            message: 'Blog not found'
        })
        const {title, summary, slug, author, body} = req.body
        await Blog.updateOne({_id: req.params._id}, {
            title,
            summary,
            slug,
            author,
            body
        })
        res.status(202).json({
            message: 'Successfully updated data'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteBlog= async (req, res)=>{
    try {
        const blog = await Blog.findById({_id : req.params._id})
        if(!blog) return res.status(404).json({
            message: 'Blog not found'
        })
        await Blog.deleteOne({_id: req.params._id})
        res.status(202).json({
            message: 'Successfully deleted data'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}