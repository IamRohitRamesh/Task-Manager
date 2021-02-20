require('../src/db/mongoose')
const { findByIdAndDelete } = require('../src/models/task')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('6023fbc8fac66254e09d42fd').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed:false})
// }).then((cnt)=>{
//     console.log(cnt)
// }).catch((e)=>{
//     console.log(e)
// })


const deleteAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    return await Task.countDocuments({completed:false})
}

deleteAndCount('602407e51826c545404c6202').then((cnt)=>{
    console.log(cnt)
}).catch((e)=>{
    console.log(e)
})