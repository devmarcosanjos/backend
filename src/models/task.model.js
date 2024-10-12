const {Schema, model} = require('mongoose')

const TaskSchema = Schema({
    description: {
        type: String, 
        requided: true, 
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})


const TaskModel = model('Task', TaskSchema)

module.exports = TaskModel