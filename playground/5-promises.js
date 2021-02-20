const doWorkPromise = new Promise((resolve,reject)=>{

    setTimeout(()=>{
        resolve([1,2,3])
        reject('Saavu da')
    },2000)

})

doWorkPromise.then((result)=>{
    console.log('Wooo' , result)
}).catch((error)=>{
    console.log('Error')
})