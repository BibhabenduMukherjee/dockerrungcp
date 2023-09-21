const jwt = require("jsonwebtoken")
function authcheck (req, res , next){
     const {authorization} = req.headers
     if(!authorization){
        res.status(403).send("Access Denied")
     }else{
        const token =  authorization.replace("Bearer ","");
        jwt.verify(token , process.env.AUTHSECRET , (err,payload)=>{
            //console.log(payload);
            if(payload != undefined){
                const {owner} = payload
                if(owner!= process.env.VERIFY_KEY_PAYLOAD) {
                    res.status(403).send("Access Denied")
                }else{
                    next();
                }
            }else{
                res.status(403).send("Access denied")
            }
           
        })
     }


}

module.exports = authcheck