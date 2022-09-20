
const express = require("express");

const cors = require("cors")

const app = express();

const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient

const URL = process.env.DB;
const DB = "batch_37_Tamil";

//// console.log(process), This is Global Value;

let users = [];

// midleware
app.use(express.json());
app.use(cors({
    origin : "http://localhost:3001"
}))

////// Query Params 

app.get("/users", async function(req, res) {
    try {
        //Step 1 : Create a  Connection between Node.js and MongoDB
       const Connection = await mongoClient.connect(URL);
       
       //Step 2 : Select the DB
       const db = Connection.db(DB);
       
       //Step 3 : Select the Collection
       //Step 4 : Do the Operation (Create, Update, Read, Delete)
       let resUser = await db.collection("users").find().toArray();
    
       //Step 5 : Close the Connection
       await Connection.close()
    
       res.json(resUser);
       } catch (error) {
           console.log(error)
        //If any error throw error
           res.status(500). json({message : "Something-went-wrong"})
       }
       
    // let queryParams = req.query
    // console.log(queryParams);

    // let resUser = []

    // for(let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index ++){
    //     if(users[index]){
    //         resUser. push(users[index])
    //     }
    // }

   
});

app.post("/aboutpost", async function(req, res){
   try {
    //Step 1 : Create a  Connection between Node.js and MongoDB
   const Connection = await mongoClient.connect(URL);
   
   //Step 2 : Select the DB
   const db = Connection.db(DB);
   
   //Step 3 : Select the Collection
   //Step 4 : Do the Operation (Create, Update, Read, Delete)
   await db.collection("users").insertOne(req.body)

   //Step 5 : Close the Connection
   await Connection.close()

   res.json({message : "Data inserted"})
   } catch (error) {
       console.log(error)
    //If any error throw error
       res.status(500). json({message : "Something-went-wrong"})
   }

   
    // console will show  results terminal side also, if you want delete the console code, it's your wish , it won't affect results 
    // console.log(req.body);
    // req.body.id = users.length + 1;
    // users.push(req.body);
    // res.json({message: "User_Created_Successfully"});
});


app.get ("/aboutpost/:id", async  function (req, res){
    try {
        //Step 1 : Create a  Connection between Node.js and MongoDB
       const Connection = await mongoClient.connect(URL);
       
       //Step 2 : Select the DB
       const db = Connection.db(DB);
       
       //Step 3 : Select the Collection
       //Step 4 : Do the Operation (Create, Update, Read, Delete)
       let user = await db.collection("users").findOne({_id:mongodb.ObjectId(req.params.id)})
    
       //Step 5 : Close the Connection
       await Connection.close()
    
       res.json(user);
       } catch (error) {
           console.log(error)
        //If any error throw error
           res.status(500). json({message : "Something-went-wrong"})
       }   




    // let giveID = req.params.id;

    // let userID = users.find((item) => item.id == giveID) 
    // if(userID){
    //     res.json(userID)
    // }else{
    //     res.json({Message : "User not found"})
    // }
})

app.put("/aboutpost/:id", async function(req, res){

    try {
        //Step 1 : Create a  Connection between Node.js and MongoDB
       const Connection = await mongoClient.connect(URL);
       
       //Step 2 : Select the DB
       const db = Connection.db(DB);
       
       //Step 3 : Select the Collection
       //Step 4 : Do the Operation (Create, Update, Read, Delete)
       let user = await db.collection("users").findOneAndUpdate({_id:mongodb.ObjectId(req.params.id)}, {$set:req.body})
    
       //Step 5 : Close the Connection
       await Connection.close()
    
       res.json(user);
       } catch (error) {
           console.log(error)
        //If any error throw error
           res.status(500). json({message : "Something-went-wrong"})
       }   


})

app.delete("/aboutpost/:id", async function(req, res){
    try {
        //Step 1 : Create a  Connection between Node.js and MongoDB
       const Connection = await mongoClient.connect(URL);
       
       //Step 2 : Select the DB
       const db = Connection.db(DB);
       
       //Step 3 : Select the Collection
       //Step 4 : Do the Operation (Create, Update, Read, Delete)
       let user = await db.collection("users").findOneAndDelete({_id:mongodb.ObjectId(req.params.id)})
    
       //Step 5 : Close the Connection
       await Connection.close()
    
       res.json(user);
       } catch (error) {
           console.log(error)
        //If any error throw error
           res.status(500). json({message : "Something-went-wrong"})
       }  



    // let giveId = req.params.id;

    // let userIndex = users.findIndex((item) => item.id == giveId);

    // if (userIndex != -1){
    //     users.splice(userIndex, 1);
    //     res.json({
    //         message : "User Deleted"
    //     })
    // }else{
    //     res.json({
    //         message:"User not found"
    //     })
    // }

})

app.listen(process.env.PORT || 3000);