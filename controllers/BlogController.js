import Blog from '../models/BlogModel.js'

export const getAllBlogs = async (req, res)=>{
    try {
        const blogs = await Blog.find()
        if(blogs.length < 1){
            throw Error(404)
        }
        res.status(200).json(blogs)
    } catch (error) {
        if(error.message == 404){
            res.status(404).json({
                message: `Data not found`
            })
        }
        res.status(500).json({
            message: `Server problemed`
        })
    }
}

export const getDataById = async (req, res)=>{
    try {
        const blog = await Blog.findById({_id : req.params._id})
        if(blog.length < 1){
            throw Error(404)
        }
        res.status(200).json(blog)
    } catch (error) {
        if(error.message == 404){
            res.status(404).json({
                message: `Data not found`
            })
        }
        console.log(error)
    }
}

export const addNewBlog = async (req, res)=>{
    try {
        const blog = new Blog({
            title: req.body.title,
            slug: req.body.slug,
            author: req.body.author,
            body: req.body.body,
            published: req.body.published,
        })
        await blog.save()
        res.status(201).json({
            message: 'Successfully save data'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something wrong when save data'
        })
    }
}

export const updateBlogById = async (req, res)=>{
    try {
        await Blog.updateOne({_id: req.params._id}, {$set: req.body})
        res.status(202).json({
            message: 'Successfully updated data'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something wrong when updated data'
        })
    }
}

export const deleteBlogById = async (req, res)=>{
    try {
        await Blog.deleteOne({_id: req.params._id})
        res.status(202).json({
            message: 'Successfully deleted data'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Somthing wrong when deleted data'
        })
    }
}