import Portfolio from "../models/PortfolioModel.js"
import path from 'path'
import fs from 'fs'
export const getPortfolios = async(req,res)=>{
    try {
        const portfolios = await Portfolio.find()
        if(portfolios.length < 1) return res.status(404).json({
            message: 'Empty data'
        })
        res.status(200).json(portfolios)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const getPortfolio = async(req,res)=>{
    try {
        const portfolio = await Portfolio.findById({_id: req.params.id})
        if(!portfolio) return res.status(404).json({
            message: 'Portfolio not found'
        })
        res.status(200).json(portfolio)
    } catch (error) {
        res.status(404).json({
            message: 'Portfolio not found'
        })
    }
}
export const postPortfolio = (req,res)=>{
    if(req.files == null) return res.status(400).json({
        message: 'No file uploaded'
    })
    const file = req.files.file
    const size = file.data.length
    const ext = path.extname(file.name)
    const imgName = file.md5 + ext
    const imgUrl = `${req.protocol}://${req.get('host')}/images/${imgName}`
    const allowed = ['.png', '.jpg', 'jpeg']
    if(!allowed.includes(ext.toLowerCase())) return res.status(422).json({
        message: 'Invalid extension'
    })
    if(size > 5000000) return res.status(422).json({
        message: 'Image must be less then 5mb'
    })
    file.mv(`./public/images/${imgName}`, async(error)=>{
        if(error) return res.status(500).json({
            message: error.message
        })
        const {name='', description='', tools=[], github='', deploy=''} = req.body
        const portfolio = new Portfolio({name, description, tools, github, deploy, imgName, imgUrl})
        try {
            await portfolio.save()
            res.status(201).json({
                message: 'Successful save portfolio'
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })
}
export const updatePortfolio = async(req, res)=>{
    const portfolio = await Portfolio.findById({_id: req.params.id})
    if(!portfolio) return res.status(404).json({
        message: 'Portfolio not found'
    })
    let newImageName = portfolio.imgName
    let newImageUrl = portfolio.imgUrl
    if(req.files == null){
        newImageName = portfolio.imgName
    }else{
        const file = req.files.file
        const size = file.data.length
        const ext = path.extname(file.name)
        const allowed = ['.png', '.jpg', 'jpeg']
        newImageName = file.md5 + ext
        newImageUrl = `${req.protocol}://${req.get('host')}/images/${newImageName}`
        if(!allowed.includes(ext.toLowerCase())) return res.status(422).json({
            message: 'Invalid extension'
        })
        if(size > 5000000) return res.status(422).json({
            message: 'Image must be less then 5mb'
        })
        const filepath = `./public/images/${portfolio.imgName}`
        fs.unlinkSync(filepath)
        file.mv(`./public/images/${newImageName}`, (error)=>{
        if(error) return res.status(500).json({
            message: error.message
        })
        })
    }
    try {
        await Portfolio.updateOne({_id: req.params.id},{
            name: req.body.name,
            description: req.body.description,
            tools: req.body.tools,
            github : req.body.github,
            deploy: req.body.deploy,
            imgName: newImageName,
            imgUrl: newImageUrl
        })
        res.status(201).json({
            message: 'Successful update portfolio'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const deletePortfolio = async(req,res)=>{
    const portfolio = await Portfolio.findById({_id: req.params.id})
    if(!portfolio) return res.status(404).json({
        message: 'Portfolio not found'
    })
    try {
        const filepath = `./public/images/${portfolio.imgName}`
        fs.unlinkSync(filepath)
        await Portfolio.deleteOne({_id: req.params.id})
        res.status(202).json({
            message: 'Successfuly delete portfolio'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}