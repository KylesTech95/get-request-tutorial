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

// routes

app.route('/home').get((req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.listen(PORT,()=>{
    console.log('You are listening on port ' + PORT + '.'
    )
})