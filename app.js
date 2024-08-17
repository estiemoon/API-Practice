const express = require('express')
const app = express()

app.listen(3333)

const userRouter = require('./route/users')
const bookRouter = require('./route/books')

app.use("/",userRouter)
app.use("/",bookRouter)

app.get('/', (req, res) => {
    res.send('Hello!')
});

