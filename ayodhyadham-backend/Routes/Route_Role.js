const pool=require('../db')
const express=require('express');
const Router_Role=express.Router();

Router_Role.post('/AddRole',async(req,res)=>{
    try {
        const {role} = req.body;
        console.log(role);
        const sessionID=req.header('sessionID');
        console.log(sessionID);
        if((!role||role===undefined||role===null)&&(!sessionID||sessionID===undefined)){
            res.json('please provide the values').status(401);
        }else{
            const preCat=await pool.query('select * from tbl_role where role_name=$1',[role]);
            if(preCat.rowCount===0){
                const data= await pool.query('Insert into tbl_role (role_name,isactive,createdby,createddate) values ($1,$2,$3,now()) returning *',[role,true,sessionID]);
                if(data!=null){
                    res.json(data.rows).status(201);
                }
            }else{
                res.json('Data already exist').status(401);
            }
            
          
        }
       
    } catch (error) {
        console.error('Error adding role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
Router_Role.get('/',async(req,res)=>{
    try {
        const allroles=await pool.query('select * from tbl_role where isactive=true');
        if(allroles!=null){
            res.json(allroles.rows).status(201);
            console.log('success');
        }
    } catch (error) {
        console.log(error);
    }
})


Router_Role.put('/Updaterole/:id',async(req,res)=>{
    try {
        const {role}=req.body;
        const {id}=req.params;
        const sessionID=req.header('sessionID');
        console.log(id);
        console.log(sessionID);
        if (!role && !sessionID&&!id) {
            return res.status(400).json({ error: 'Please provide role and sessionID' });
        }else{
            const response=await pool.query('update tbl_role set role_name=$2,updatedby=$3,updateddate=now() where role_id=$1 returning *',[id,role,sessionID]);
            if(response.rowCount>0){
                res.json('Updated Successfully').status(200);
            }
        }
    } catch (error) {
     console.error(error.message);   
    }
   
    
})

//to deactivate the role
Router_Role.put('/Deleterole/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const sessionID=req.header('sessionID');
        console.log(id);
        console.log(sessionID);
    if(!id&&!sessionID){
        res.status(401).json('please provide the values');
    }else{
        const response=await pool.query('UPDATE tbl_role SET isactive=false,deletedby=$1,deleteddate=now() WHERE role_id=$2 returning *', [sessionID,id]);
        console.log(response.rows);
        if(response.rows.length>0){
            console.log(response.rows)
            res.status(200).json('Deleted Successfully');
        }else{
            res.status(404).json('server error');
        }
    }
    } catch (error) {
        console.error(error.message);
        res.status(500).json('An error occurred while deleting the role');
    }
    
})
Router_Role.get('/Selectrole/:id',async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const data=await pool.query('select * from tbl_role where role_id=$1 and isactive=true',[id]);
    console.log(data.rows);
    if(data.rowCount>0){
        res.json(data.rows).status(201);
    }else{
        res.json('role Does Not Exist by this ID').status(404);
    }
})
module.exports=Router_Role;