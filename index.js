const express = require("express");
const { users } = require("./data/users.json")

const app = express();

const PORT = 8081;

app.use(express.json());

/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: public
 * Parameter: None
 */

app.get("/users",(req,res)=>{
  res.status(200).json({
    success: "true",
    data: users,
  })
})

app.get("/", (req,res)=>{
  res.status(200).json({
    message: "Server is up and running :->",
    data: "hey",
  });
});

app.get("*", (req,res)=>{
  res.status(404).json({
    message: "This route doesn't exist"
  });
});


app.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`)
});
