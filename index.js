const express = require('express')
const dotenv = require('dotenv')

const connectToDatabase = require('./src/database/mongose.database')

dotenv.config()
const app = express()

connectToDatabase()

app.get('/task', (req, res) => {
    const task = [{
        description: 'estudar',
        isConplite: false
    }]
    res.status(200).send(task)
})

app.listen(8000, () => console.log('Server on port 8000!'))