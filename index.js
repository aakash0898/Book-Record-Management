const express = require("express");
const { users } = require("./data/users.json");
//const { books } = require("./data/books.json");

const userRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const router = express();

const PORT = 8081;

router.use(express.json());

router.get("/", (req,res)=>{
  res.status(200).json({
    message: "Server is up and running :->",
    data: "hey",
  });
});

router.use("/users", userRouter);
router.use("/books", booksRouter);



router.get("*", (req,res)=>{
  res.status(404).json({
    message: "This route doesn't exist"
  });
});


router.listen(PORT, ()=>{
  console.log(`Server is running at port ${PORT}`)
});
