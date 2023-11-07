const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//Routes
const authRoutes = require("./routes/authRoutes");

app.use("/user", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
