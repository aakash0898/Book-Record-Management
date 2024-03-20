const express = require("express");
const dotenv = require("dotenv");

const DbConnection = require("./databaseconnection");

const userRouter = require("./routes/users");
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());

// http://localhost:8081/users/
app.get("/", (req,res)=>{
  res.status(200).json({
    message: "Server is up and running :->",
    data: "hey",
  });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);



app.get("*", (req,res)=>{
  res.status(404).json({
    message: "This route doesn't exist"
  });
});


app.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`)
});
