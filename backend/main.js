const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


require('dotenv').config();

const app = express()
 
const port  = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())


const db = require('./keys').mongoURI;
// Connect to mongoDB
mongoose.connect(db).then(() => {
    console.log("Mongo db connected")

}).catch(err => {
    console.log(err)
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})