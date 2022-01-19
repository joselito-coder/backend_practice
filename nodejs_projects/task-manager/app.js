const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const port = 3000
const connectDB = require('./db/connect')
require('dotenv').config( )
const notFound = require('./middleware/NotFound');

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`the server has sarted on port ${port}`)
        })
    }
    catch (error){
        console.log(error)
    }
}

start()

// middleware
app.use(express.json())
app.use(express.static('./public'))

app.use("/api/v1/tasks",tasks)
app.use(notFound)


