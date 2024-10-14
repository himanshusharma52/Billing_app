const express= require("express");
const connection = require("./connection");
const router = require("./routes/user");
const app = express();
const port = 3000;


app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

connection();
app.use(router)





app.listen(port,(err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log("Server is running on port ", port);
    }
})