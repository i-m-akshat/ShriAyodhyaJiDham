const jwt=require('jsonwebtoken');
require("dotenv").config();
const jwtGen=(id,role)=>{
const payload={
    id:id,
    role:role
}
return jwt.sign(payload,process.env.JWTSECRETKEY,{expiresIn:'1hr'})
}
module.exports=jwtGen;