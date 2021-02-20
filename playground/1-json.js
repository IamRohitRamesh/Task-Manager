const fs = require('fs')

// const book ={
//     title:'ramyanam',
//     author:'kamban'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-JSON.json',bookJSON)

// const parsedBook = JSON.parse(bookJSON)
// console.log('Title :' +parsedBook.title)
// console.log('Author :' +parsedBook.author)

const dataBuffer = fs.readFileSync('1-JSON.json')
//console.log(dataBuffer.toString())

const parsedData = JSON.parse(dataBuffer.toString())
parsedData.name = 'Rohit'
parsedData.age = '24'

const dataJSON = JSON.stringify(parsedData);
fs.writeFileSync('1-JSON.json',dataJSON)
