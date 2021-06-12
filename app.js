const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User')

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));


app.use(express.urlencoded({extended: true}));

app.use(express.json())
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// app.use(bodyParser.json());

app.get("/", (req, res) => {
  const user = new User({
    handle: "jim",
    email: "jim@gmail.com",
    password: "jim123"
  })
  user.save()
  res.send("Hello 2 World")
});
app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


