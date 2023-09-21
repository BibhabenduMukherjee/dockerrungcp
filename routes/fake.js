const express = require("express")
const router = express.Router();


router.get('/fake' , async(req, res)=>{
    
    //redis.append("s",s)
    
    await new Promise((resolve) => setTimeout(resolve, 9000));

    res.send("ok");
})

module.exports = router