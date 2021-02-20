const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Negative age')
            }
        }
    },
    Email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Wrong email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password should not contain password')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function (req,res){
    const user = this

    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject

}

userSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = jwt.sign({_id:user._id.toString()},'RohitRamesh')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token

}

userSchema.statics.findByCredentials = async(Email,password)=>{
    
    const user = await User.findOne({Email})

    if(!user){
        throw new Error('No User')
    }

    const isMatch = bcrypt.compareSync(password,user.password)

    if(!isMatch){
        throw new Error('Wrong password')
    }

    return user
}

userSchema.pre('save',function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = bcrypt.hashSync(user.password,8)
    }

    next()
})


userSchema.pre('remove',async function (next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User