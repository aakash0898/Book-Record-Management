const express = require("express");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: get all users
 * Access: public
 * Parameter: None
 */

// http://localhost:8081/
router.get("/",(req,res)=>{
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /:id
 * Method: GET
 * Description: Get single users by ID
 * Access: public
 * Parameter: ID
 */

router.get("/:id",(req,res)=>{
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
 * Route: /
 * Method: POST
 * Description: Creating new user
 * Access: public
 * Parameter: None
 */

router.post("/",(req,res)=>{
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
 * Route: /:id
 * Method: PUT
 * Description: Updating user by ID
 * Access: public
 * Parameter: ID
 */

router.put("/:id",(req,res)=>{
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
 * Route: /:id
 * Method: DELETE
 * Description: Deleting user by ID
 * Access: public
 * Parameter: ID
 */

router.delete("/:id",(req,res)=>{
  const {id} = req.params;
  const user = users.find((each)=> each.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message: "User with the ID doesn't Exists !!!",
    });
  }

  const index = users.indexOf(user);
  users.splice(index,1)

  return res.status(200).json({
    success: true,
    message: "Deleted user from the list",
    data: users,
  });
});

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user Subscription Details
 * Access: Public
 * Parameters: ID
 */
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User With The ID Didn't Exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // Jan 1 1970 UTC
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  // console.log("returnDate ", returnDate);
  //   console.log("currentDate ", currentDate);
  //     console.log("subscriptionDate ", subscriptionDate);
  //       console.log("subscriptionExpiration ", subscriptionExpiration);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
});

module.exports = router;