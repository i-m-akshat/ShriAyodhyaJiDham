const pool=require('../db');
const express=require('express');
const CategoryRouter=express.Router();
//to get the Categories
CategoryRouter.get('/',async(req,res)=>{
    try {
        const allCategories=await pool.query('select * from tbl_category where is_active=true');
        if(allCategories!=null){
            res.json(allCategories.rows).status(201);
            console.log('success');
        }
    } catch (error) {
        console.log(error);
    }
})

//to insert the Category
CategoryRouter.post('/AddCategory', async ( req, res )=>{
    try {
        const {category} = req.body;
        console.log(category);
        const sessionID=req.header('sessionID');
        console.log(sessionID);
        if((!category||category===undefined)&&(!sessionID||sessionID===undefined)){
            res.json('please provide the values').status(401);
        }else{
            const preCat=await pool.query('select * from tbl_category where category_name=$1',[category]);
            if(preCat.rowCount===0){
                const data= await pool.query('Insert into tbl_category (category_name,is_active,createdby,createddate) values ($1,$2,$3,now()) returning *',[category,true,sessionID]);
                if(data!=null){
                    res.json(data.rows).status(201);
                }
            }else{
                res.json('Data already exist').status(401);
            }
            
          
        }
       
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
})
//to update the categoy
CategoryRouter.put('/UpdateCategory/:id',async(req,res)=>{
    try {
        const {category}=req.body;
        const {id}=req.params;
        const sessionID=req.header('sessionID');
        console.log(id);
        console.log(sessionID);
        if (!category && !sessionID&&!id) {
            return res.status(400).json({ error: 'Please provide category and sessionID' });
        }else{
            const response=await pool.query('update tbl_category set category_name=$2,updatedby=$3,updateddate=now() where category_id=$1 returning *',[id,category,sessionID]);
            if(response.rowCount>0){
                res.json('Updated Successfully').status(200);
            }
        }
    } catch (error) {
     console.error(error.message);   
    }
   
    
})

//to deactivate the category
CategoryRouter.put('/DeleteCategory/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const sessionID=req.header('sessionID');
        console.log(id);
        console.log(sessionID);
    if(!id&&!sessionID){
        res.status(401).json('please provide the values');
    }else{
        const response=await pool.query('UPDATE tbl_category SET is_active=false,deletedby=$1,deleteddate=now() WHERE category_id=$2 returning *', [sessionID,id]);
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
        res.status(500).json('An error occurred while deleting the category');
    }
    
})
CategoryRouter.get('/SelectCategory/:id',async(req,res)=>{
    const {id}=req.params;
    
    const data=await pool.query('select * from tbl_Category where category_id=$1',[id]);
    console.log(data.rows);
    if(data.rowCount>0){
        res.json(data.rows).status(201);
    }else{
        res.json('Category Does Not Exist by this ID').status(404);
    }
})

module.exports=CategoryRouter;