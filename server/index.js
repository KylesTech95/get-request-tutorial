require('dotenv').config();
const helmet = require('helmet')
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5543

// middleware
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(helmet())

//__________________________________________________________________

// routes
app.route('/home').get((req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.route('/my-data').get((req,res)=>{
    const messageObj = {message:'resposne came back from /my-data endpoint'}
    res.json(messageObj)
})
app.route('/random-number').get((req,res)=>{
    let array=[]
    for(let i = 0; i < 100;i++){
        array.push(i)
    }
    array = [...array].map((_,x)=>x%2==0 ? 'string: '+_:x)
    res.json({number:array[Math.floor(Math.random()*array.length)]})
})

//__________________________________________________________________

// listen on port
app.listen(PORT,()=>{
    console.log('You are listening on port ' + PORT + '.'
    )
})