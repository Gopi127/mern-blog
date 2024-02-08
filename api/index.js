const express = require("express");
const connection = require("./storage/db");

const app = express();

connection();
const port = 4001;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
