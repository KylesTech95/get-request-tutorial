const express = require('express')
const app = express();
const PORT = 4454



// listen on server
app.listen(PORT,()=>{
    console.log(`You are listening on port ${PORT}\nMore text added`)
})