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



// listen on server
app.listen(PORT,()=>{
    console.log(`You are listening on port ${PORT}\nMore text added`)
})