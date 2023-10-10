const express = require("express");
const app = express();

//Middleware
app.use(express.json());

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
