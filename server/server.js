const express = require("express");
const path = require("path");
const routes = require("./routes");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets
// if (NODE_ENV="production node server/server.js") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/src/App'));
// });
 
app.get("",(req,res)=> {
  console.log("server is running")
})

app.use(routes);

db.once("open", () => {
  app.listen(3001, () => {
    console.log(`API server running on port 3001!`);
  });
});
