const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const port = 3000


// middleware
app.use(express.json())



app.get('/hello',(req,res) =>{
    res.send('Hello world')
})

app.use("/api/v1/tasks",tasks)


app.listen(port,()=>{
    console.log(`the server has sarted on port ${port}`)
})