const express=require('express')
const router=express.Router()
const User=require('../models/user')

router.post ('/', async (req,res)=>{
    try {
        const user= await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


router.get('/',async(req,res)=>{
    try {
        const users=await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user)return res.status(404).json({error:'user not found'})
            res.json(user)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


router.put('/:id',async(req,res)=>{
    try {
        const updated=await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updated)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({message:'user deleted'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports=router