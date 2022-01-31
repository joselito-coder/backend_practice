require('dotenv').config()
require('express-async-errors')


// express
const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const productRouter = require('./routes/products')

// import middlewares
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')


// middlewares
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Store api </h1><a href="/api/v1/products"> products route </a>')
});

// Products routes
app.use('/api/v1/products',productRouter)



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 3000

const start = async () => {
    try {
        // connect to database
        await connectDB(process.env.MONGO_URI)

        app.listen(port, console.log(`Ther server is listening on port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}

start()