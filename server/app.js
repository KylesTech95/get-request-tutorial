const express = require('express')
const app = express();
const PORT = 4454
const fs = require('fs')
const path = require('path')


// routes
// app.get('/test',(req,res)=>{
//     res.send('Hello World')
// })

// grab list of users
app.get('/users',function(req,res){
    // string state (stringified)
    const users = fs.readFileSync(path.resolve('server/users.json'),{encoding:'utf8'})

    // console.log(users)
    if(users){
        // parse into an object
        let jsonUser = JSON.parse(users)
        // res.json(jsonUser)

        //filter of users by id
        // res.json({odd_users:[...jsonUser].filter((user,index)=>{
        //     return index%2!==0;
        // })})

        //sorting users by id
        // res.json({odd_users:[...jsonUser].sort((a,b)=>{
        //     // sorting desc
        //     return a.id-b.id 
        // })})

        // map list of users' data
        res.json({foodie:[...jsonUser].map(user=>{
           return `${user.name} loves to eat ${user.food}`
        })})

        //for loop
        for(let i = 0; i < jsonUser.length;i++){
            console.log(jsonUser[i])
            // timeout to show user data
            setTimeout(()=>{
                console.log(jsonUser[i])
            },1000*(i+1))
        }
    }
})


const animals = [{
    id:1,
    name: 'victor',
    type:'bird'
},
{
    id:2,
    name: 'james',
    type:'reptile'
},
{
    id:3,
    name: 'kyle',
    type:'jaguar'
},
{
    id:4,
    name: 'mary',
    type:'canine'
}]

// allowed inputs
const allowed_inputs = ['one','two','three']

// requset params
app.get('/animals/:limit/:type/:word',function(req,res){
// console params
// console.log(req.params.name)
// console.log(req.params.id)

// for(i in req.params){
//     console.log(i) // property
//     console.log(req.params[i]) // value
// }
// const type_of_animal = [...animals].filter((animal,index)=>{
//     // method
//     // return animal.type === req.params.type 
//     return animal.id >= req.params.limit
// })

// console.log(type_of_animal)

// regex with params
// if(/car/g.test(req.params.word)){
//     res.json({message:req.params.word}) // true
// }
// else{
//     console.log('wrong regex input')
//     res.json({error:'wrong regex input'}) // false
// }


// allowed inputs

// if(!allowed_inputs.includes(req.params.word)){
//     throw new Error('wrong input made')
// }
// else{
//     res.json({message:'success with '+req.params.word})
// }



})

// request query
app.get('/query',function(req,res){
    //method
    console.log(req.query) // req query object
    // console.log(req.query.type) // query value

    //______________________________________
    // imaginary object that represents req.query object

    /*
    ?
    {
        type: 44, [&]
        car: corvette
    }
     */
})






// functions

const generate5Nums = (numbers,arr=[]) => {
    // metheod
    let max = 5;
    let min = 0;
    let random;


    // while loop
    while(max > min){
        // iteration
        random = numbers[Math.floor(Math.random()*numbers.length)]
        if(arr.includes(random)){
            random = numbers[Math.floor(Math.random()*numbers.length)]
        } else{
            arr.push(random);
            max-=1
        }
    }
    return arr
}

const checkInvalidProp = (keys) => {
    // method to check invalid property
    return [...keys].length === 1 && keys[0] == 'guess' && !/function/.test(typeof(keys[0])) ? false : true
}

const checkInvalidValue = (vals) => {
    // method to check invalid value
    return vals.every((val,index)=> !/function/.test(typeof(val))) && vals.every((val,index)=>/^(-)?\d+$/.test(val)) ? false : true
}

const checkTooManyGuesses = (vals) => {
    // method to check if we have more than 3 guesses
    return !(vals.length <= 3 && vals.length > 0);
}

const checkOutOfScope = (vals) => {
    // method to check if numbers are out of scope
    return [...vals].filter(val=>{
        return (+val) < 1 || (+val) > 15 /// what we do not want!
    }).length > 0
}

const gameLost = (vals,randoms) => {
    // method to check if we lost the game
    return [...randoms].every(random=>{
        return [...vals].every(val=>{
           return val != random
        })
    })
}





app.get('/number-guess',function(req,res){
    //method
   let queries = req.query; // queries object
   let keys = Object.keys(queries) // array of keys (property)
   let vals = Object.values(queries).flat() // array of values
   let numbers = new Array(15).fill("").map((x,index) => index + 1)
   console.log(vals)
//    console.log(numbers)
   let arr;
   let randomNums = generate5Nums(numbers,arr)
//    console.log(randomNums)

// boolean checks
const invalidProp = checkInvalidProp(keys)
// console.log(invalidProp)
const invalidVal = checkInvalidValue(vals)
// console.log(invalidVal)
const tooManyGuesses = checkTooManyGuesses(vals)
// console.log(tooManyGuesses)
const outOfScope = checkOutOfScope(vals)
// console.log(outOfScope)

// making the game work
if(!queries.hasOwnProperty('guess')){
    // end
    res.send("No properties listed")
}
else{
    // continue
    // check if prop & value is correct
    if(invalidProp && invalidVal){
        res.send("invalid property & value")
    }
    else if(invalidProp){
        res.send("invalid prop")
    }
    else if(invalidVal){
        res.send("invalid value")
    }
    //_______________
    else{
        // continue
        // too many guesses
        if(tooManyGuesses){
            res.send("Too many guesses")
        }
        else if(outOfScope){
            res.send("values are outside of 1 & 15. Try again.")
        }
        else {
            // check lose
            if(gameLost(vals,randomNums)){
                res.json({message:"You lose, try again",nums:randomNums})
            } else {
                // check win
                res.json({message:"You Win,",nums:randomNums})
            }
        }
    }
}

})

// 53:04 - cutout & cut into the next video






// listen on server
app.listen(PORT,()=>{
    console.log(`You are listening on port ${PORT}\nMore text added`)
})