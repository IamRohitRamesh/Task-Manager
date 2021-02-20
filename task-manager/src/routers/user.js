const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/users',async (req,res)=>{

    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/login',async(req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.Email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{

    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/me',auth,async (req,res)=>{
    
    res.send(req.user)
})

router.patch('/users/updateMe',auth,async(req,res)=>{
    const user = this
    const reqUpdates = Object.keys(req.body)
    const possibleUpdates = ['name','Email','password','age']
    const validUpdate = reqUpdates.every((key)=>possibleUpdates.includes(key))

    if(!validUpdate){
        return res.status(500).send({error : 'invalid update'})
    }

    try{

        reqUpdates.forEach((update)=>req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth,async(req,res)=>{

    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        return res.status.send(e)
    }
})


module.exports = router
