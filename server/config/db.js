
// configure mongodb connection
const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect(process.env.DATABASE_URL+"/chathistory", {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
}

module.exports = connectDB