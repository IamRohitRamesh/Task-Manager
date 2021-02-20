// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

const {MongoClient,ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const dbName = 'tasks'


MongoClient.connect(connectionURL, {useUnifiedTopology:true}, (error,client)=>{
    
    const db = client.db(dbName)

    // db.collection('users').updateOne({name:'olu'},{
    //     $set :{
    //         name:'Supernae'
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log('error')
    // })
    // db.collection('tasks').updateMany({
    //     status:true
    // },{
    //     $set:{
    //         status:false
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description : 'Office'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log('Ooothr')
    })
})