require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('6023c980cb01cf49b8f36e38',{age:24}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:24})
// }).then((cnt)=>{
//     console.log(cnt)
// }).catch((e)=>{
//     console.log(e)
// })


const updateAndCount = async (id,age)=>{
    const task = await User.findByIdAndUpdate(id,{age})
    return await User.countDocuments({age})
}

updateAndCount('602406df1826c545404c6200',26).then((cnt)=>{
    console.log(cnt)
}).catch((e)=>{
    console.log(e)
})
