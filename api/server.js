const express = require("express");
const userRoutes = require("./router/userRouter");
const connection = require("./storage/db");

const app = express();
connection();
const port = 4001;

app.use(express.json());
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
