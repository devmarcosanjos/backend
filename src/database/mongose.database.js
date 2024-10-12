const mongoose = require('mongoose')


const connectToDatabase = async () => {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmagenercluster.dlehu.mongodb.net/?retryWrites=true&w=majority&appName=TaskMagenerCluster`
    )     
}

module.exports = connectToDatabase