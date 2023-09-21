const express = require('express')
const cors = require('cors');

const createvm = require('./routes/createvm');
const app = express(); 
app.use(cors());
const fake = require('./routes/fake');
require("dotenv").config()
app.use(express.json())
app.use(function(req, res, next){
    app.disable("X-Powered-By");
    next()
    
})
app.get("/" , (req,res) => {
    res.send("welcome from nodejs google cloud run")
} )
app.use("/api/v1", createvm)
app.use("/api/v1/", fake)

 

//console.log()

app.listen(process.env.PORT || 8080 , ()=>{
    console.log("Listening...");
})