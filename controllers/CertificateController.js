import Certificate from "../models/CertificateModel.js"
import path from 'path'
import fs from 'fs'
export const getCertificates = async(req,res)=>{
    try {
        const certificate = await Certificate.find()
        if(certificate.length < 1) return res.status(404).json({
            message: 'Empty data'
        })
        res.status(200).json(certificate)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const getCerticate = async(req,res)=>{
    try {
        const certificate = await Certificate.findById({_id: req.params.id})
        if(!certificate) return res.status(404).json({
            message: 'Certificate not found'
        })
        res.status(200).json(certificate)
    } catch (error) {
        res.status(404).json({
            message: 'Certificate not found'
        })
    }
}
export const postCertificate = (req,res)=>{
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
        const {name='', description='', github=''} = req.body
        const certificate = new Certificate({name, description, github, imgName, imgUrl})
        try {
            await certificate.save()
            res.status(201).json({
                message: 'Successful save certificate'
            })
        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    })
}
export const updateCertificate = async(req, res)=>{
    const certificate = await Certificate.findById({_id: req.params.id})
    if(!certificate) return res.status(404).json({
        message: 'Portfolio not found'
    })
    let newImageName = certificate.imgName
    let newImageUrl = certificate.imgUrl
    if(req.files == null){
        newImageName = certificate.imgName
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
        const filepath = `./public/images/${certificate.imgName}`
        fs.unlinkSync(filepath)
        file.mv(`./public/images/${newImageName}`, (error)=>{
        if(error) return res.status(500).json({
            message: error.message
        })
        })
    }
    try {
        await Certificate.updateOne({_id: req.params.id},{
            name: req.body.name,
            description: req.body.description,
            github : req.body.github,
            imgName: newImageName,
            imgUrl: newImageUrl
        })
        res.status(201).json({
            message: 'Successful update certificate'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const deleteCertificate = async(req,res)=>{
    const certificate = await Certificate.findById({_id: req.params.id})
    if(!certificate) return res.status(404).json({
        message: 'Certificate not found'
    })
    try {
        const filepath = `./public/images/${certificate.imgName}`
        fs.unlinkSync(filepath)
        await Certificate.deleteOne({_id: req.params.id})
        res.status(202).json({
            message: 'Successfuly delete certificate'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}