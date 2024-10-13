const express = require('express')
const dotenv = require('dotenv')

const connectToDatabase = require('./src/database/mongose.database')
const TaskModel = require('./src/models/task.model')

dotenv.config()
const app = express()
app.use(express.json())

connectToDatabase()

app.get('/tasks', async (req, res) => {
    try {
        const task = await TaskModel.find({});
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id
        const task = await TaskModel.findById(taskId);

        if(task) return console.log('ok')
        
        res.status(200).send(error.message)


    } catch (error) {
        res.status(404).send("Essa tarefa não foi encontrada");
    }
})

app.post('/tasks', async (req, res) => {
   try {
     const newTask = new TaskModel(req.body);

     await newTask.save();
     res.status(201).send(newTask);
   } catch (error) {
        res.status(500).send(error.message)
   }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id

        const taskToDelete = await TaskModel.findById(taskId)

        if(!taskToDelete){
            return res.status(404).send('Essa tarefa não foi encontrada')
        }

        const deleteTask = await TaskModel.findByIdAndDelete(taskId)

        res.status(200).send(deleteTask)
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.listen(8000, () => console.log('Server on port 8000!'))