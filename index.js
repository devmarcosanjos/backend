const express = require('express')
const dotenv = require('dotenv')
const TaskRouter = require('./src/routes/taks.routes')

const connectToDatabase = require('./src/database/mongose.database')

dotenv.config()
const app = express()
app.use(express.json())

connectToDatabase()

app.use("/tasks", TaskRouter);

app.listen(8000, () => console.log('Server on port 8000!'))