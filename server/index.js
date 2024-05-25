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
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
  })
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  // Secure endpoints/URL with new RegExp (regex)
// app.use((req,res,next)=>{
//     // helper function to validate endpoint
//     const checkValidRegex = (arr,current_path) => {
//         arr = arr.filter(endpoint=>{
//             let hypothetical;
//             let convertRegexToString = "/" + endpoint.toString().slice(3,-3) // convert regex to a string
//             let convertStringToRegex = new RegExp(convertRegexToString+"$") // discard additional slash in our new regex
//             hypothetical = convertStringToRegex
//             // console.log(endpoint)
//             // console.log(hypothetical)
//             return endpoint.test(current_path) || hypothetical.test(current_path)
//         })
//         console.log(arr.length)
//         console.log(arr)
//         return arr.length !== 1
//     }
//     let includeRegex = [new RegExp('/daddy/'),new RegExp('/daddy2/'),new RegExp('/daddy3/')]
//     // get route params
//     let currentPath = req.path;
//     let currentMethod = !req.method.get ? undefined : req.method.get;
//     // check valid regex
//     let validRegex = checkValidRegex(includeRegex, currentPath) // check for valid regex in url

//     try{
//         if(validRegex && currentMethod == undefined){
//             res.send("something wrong with app. check url")
//         }
//         else{
//             next();
//         }
//     }
//     catch(err){
//         res.send(err,'console.log("App broke. Check URL"')
//     }
// })
//    __
//    ||
//    ||
//  __||__
//  \    /
//   \  /
//    \/

// endpoints of daddy regexp
app.get('/daddy/api',function(req,res){
    res.send("daddy app sent!")
})
app.get('/daddy2/api',function(req,res){
    res.send("daddy2 app sent!")
})
app.get('/daddy3/api',function(req,res){
    res.send("daddy3 app sent!")
})
// reversed endpoints to test regex
app.get('/api/daddy',function(req,res){
    res.send("reverse daddy app sent!")
})
app.get('/api/daddy2',function(req,res){
    res.send("reverse daddy2 app sent!")
})
app.get('/api/daddy3',function(req,res){
    res.send("reverse daddy3 app sent!")
})

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

app.route('/api/users').get((req,res)=>{
    const {firstname} = req.query
    let control = 'random'
    let regex = new RegExp(control,'ig')
    if(!regex.test(firstname)){
        res.json({message:false,currentword:control})
    }
    else{
        res.json({message:true,currentword:control})
    }
})

//__________________________________________________________________

// listen on port
app.listen(PORT,()=>{
    console.log('You are listening on port ' + PORT + '.'
    )
})