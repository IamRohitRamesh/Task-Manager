const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks',auth,async (req,res)=>{

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.send(task)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/tasks',auth,async (req,res)=>{

    
    try{
        const tasks = await Task.find({owner:req.user._id})
        //await req.user.populate('tasks').execPopulate()
        if(!tasks){
            return res.error(400).send()
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id,owner:req.user._id})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id',auth,async(req,res)=>{
    const reqUpdates = Object.keys(req.body)
    const possibleUpdate = ['description','completed']
    const validUpdate = reqUpdates.every((key)=>possibleUpdate.includes(key))

    if(!validUpdate){
        return res.status(400).send({error:'Invalid Update'})
    }

    try{

        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        
        if(!task){
            res.status(400).send()
        }
        reqUpdates.forEach((update)=>task[update]=req.body[update])
        await task.save()
        res.send(task)
    }catch(e){
        res.status(500).send(e)           
    }
})

router.delete('/tasks/:id',auth,async(req,res)=>{
    
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router