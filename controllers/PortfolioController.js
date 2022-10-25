import Portfolio from "../modules/PortfolioModule.js"
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
        res.status(200).json(portfolio)
    } catch (error) {
        res.status(404).json({
            message: 'Portfolio not found'
        })
    }
}
export const postPortfolio = async(req,res)=>{
    const {companyName='', description='', tools=[], github='', deploy='', imgUrl=''} = req.body
    const portfolio = new Portfolio({companyName, description, tools, github, deploy, imgUrl})
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
}
export const updatePortfolio = async(req, res)=>{
    try {
        const portfolio = await Portfolio.findById({_id: req.params.id})
        if(!portfolio) return res.status(404).json({
            message: 'Portfolio not found'
        })
        await Portfolio.updateOne({_id: req.params.id}, {$set: req.body})
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
    try {
        await Portfolio.deleteOne({_id: req.params.id})
        res.status(202).json({
            message: 'Successful delete portfolio'
        })
    } catch (error) {
        res.status(404).json({
            message: 'Portfolio not found'
        })
    }
}