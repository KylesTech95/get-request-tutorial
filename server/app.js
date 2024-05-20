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

    console.log(users)
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




// listen on server
app.listen(PORT,()=>{
    console.log(`You are listening on port ${PORT}\nMore text added`)
})