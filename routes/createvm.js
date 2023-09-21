const express = require("express");
const authcheck = require("../middlewares/authcheck");
const createvmins = require("../src/compute/createvmins");
const userIdFormater = require("../lib/userIdFormater");
const router = express.Router();

router.post("/createvm" ,authcheck ,async (req, res) => {
    const originalUserId = req.body.userid
    let newUserId = userIdFormater(originalUserId);
    //console.log(newUserId);
    
    const data = {...req.body , newUserId}
    console.log(data);
    const vmInfo = await createvmins(data)
    console.log( "response data from server ",vmInfo);
    res.send(vmInfo)
})

module.exports = router;