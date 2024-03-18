const express = require("express");
const { users } = require("./data/users.json");
//const { books } = require("./data/books.json");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req,res)=>{
  res.status(200).json({
    message: "Server is up and running :->",
    data: "hey",
  });
});

/**
 * Route: /users
 * Method: GET
 * Description: get all users
 * Access: public
 * Parameter: None
 */

// http://localhost:8081/
app.get("/users",(req,res)=>{
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Get single users by ID
 * Access: public
 * Parameter: ID
 */

app.get("/users/:id",(req,res)=>{
  const {id} = req.params;
  const user = users.find((each)=>each.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "User doesn't exists !!!!"
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating new user
 * Access: public
 * Parameter: None
 */

app.post("/users",(req,res)=>{
  const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
  const user = users.find((each)=>each.id === id);

  if(user){
    return res.status(404).json({
      success: false,
      message: "User with ID already Exists !!!"
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User Added successfully",
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating user by ID
 * Access: public
 * Parameter: ID
 */

app.put("/users/:id",(req,res)=>{
  const {id} = req.params;
  const {data} = req.body;

  const user = users.find((each)=>each.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "User with the ID doesn't Exists !!!!"
    });
  }
  const updateUserData = users.map((each)=> {
    if(each.id===id){
      return{
        ...each,
        ...data,
      }
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Data Updated !!",
    data: updateUserData,
  });
});

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting user by ID
 * Access: public
 * Parameter: ID
 */

app.delete("/user/:id",(req,res)=>{
  const {id} = req.params;
  const user = users.find((each)=> each.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "User with the ID doesn't Exists !!!",
    });
  }

  
});



app.get("*", (req,res)=>{
  res.status(404).json({
    message: "This route doesn't exist"
  });
});


app.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`)
});
