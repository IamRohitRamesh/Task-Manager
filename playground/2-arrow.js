// const square = (a) => a * a

// console.log(square(2))


const event = {
    name:'party',
    guestList:['Rohit','Muja','Romuja'],
    printGuests(){
        console.log('Birthday list for ' +this.name)
        this.guestList.forEach((guest)=>{
            console.log(guest +' is attending ' +this.name)
        })
    }
}

event.printGuests()