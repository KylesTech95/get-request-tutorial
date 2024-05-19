const express = require('express');
const app = express();
const PORT = 5543



// list of users
let users = [{
    id:1,
    name:'James',
    food:'banana'
},{
    id:2,
    name:'Kelly',
    food:'slices-ham'
},{
    id:3,
    name:'Ben',
    food:'salad'
},
{
    id:4,
    name:'Kyle',
    food:'chicken'
},
{
    id:3,
    name:'Max',
    food:'Bacon'
},
{
    id:3,
    name:'Shane',
    food:'Smoothie'
}]

//__________________________________________________________________

// routes







//__________________________________________________________________

//middleware
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })
  app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

//__________________________________________________________________

// listen on port
app.listen(PORT,()=>{
    console.log('You are listening on port ' + PORT + '.'
    )
})