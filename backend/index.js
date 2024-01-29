const app = require('./app');
const {PORT} = require('./utils/config')
const mongoose = require('mongoose');
const {MONGO_URI} = require('./utils/config');

mongoose.set('strictQuery', false)

const runDb = async () => {
   await mongoose.connect(MONGO_URI)
   console.log("connected to mongodb now");
}

runDb().catch(err => console.error(err))

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
