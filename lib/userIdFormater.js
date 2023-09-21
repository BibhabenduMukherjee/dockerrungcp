const userIdFormater= (id)=>{
    let newUserId = id.toLowerCase().split("_")[1].substring(0,15).replace(/\d/g,"") + '-' + Date.now().toString().substring(2,15);
  
    return newUserId
}
module.exports = userIdFormater