const authorization=require('../Services/Authorization');
const express=require('express');
const Router=express.Router();

Router.get('/',authorization,async(req,res)=>{
try {
    res.json(true);
} catch (error) {
    res.status(500).json('server error ')
}
});
module.exports=Router;