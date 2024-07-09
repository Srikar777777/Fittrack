const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://srikar22bce7859:Srikar777@cluster0.ni1yeow.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if (err) throw err;
  console.log('Connected to MongoDB!')
}

);

module.exports = mongoose.connection;
