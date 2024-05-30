const jwt=require('jsonwebtoken');
require('dotenv').config();

const authorization=(req,res,next)=>{
try {
    const jwtToken=req.header('token');
    // const role=req.header('role');
    if(!jwtToken){
        res.status(401).json('Not Authorized');
    }else{
        const payload=jwt.verify(jwtToken,process.env.JWTSECRETKEY);
        req.id=payload.id;
        req.role=payload.role;
        next();
    }
} catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorised");
}

}
module.exports=authorization;