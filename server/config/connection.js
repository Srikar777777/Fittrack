const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://localhost:27017/",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if (err) throw err;
  console.log('Connected to MongoDB!')
}

);

module.exports = mongoose.connection;
