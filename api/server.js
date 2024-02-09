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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
