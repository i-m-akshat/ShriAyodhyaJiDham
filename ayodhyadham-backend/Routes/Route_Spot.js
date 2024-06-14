const express=require('express');
const fs=require('fs');//importing fs
const pool=require('../db');
const Router_Spot=express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../Services/CloudinaryConfig');
const path=require('path');
const multer=require('multer');
// const upload=multer({dest:"uploads/"});//this is a middleware
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         //create directory
//         // fs.mkdir('uploads/images',(err)=>{
//             return cb(null,"uploads/images");
//         // });
       
//     },//telling which folder will contain file//file-file user trying to upload, cb -callback have 2 param=foldername, return
//     filename:function(req,file,cb){
//         return cb(null,`${Date.now()}-Image-${file.originalname}`);
//     },
// })
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads/images',
        allowedFormats: ['jpg', 'png', 'jpeg'],
    }
});
// const upload=multer({storage});

//To Add the Spots
// upload.fields([
//     {name:'iconImage',maxCount:1},
//     {name:'bannerImage',maxCount:1}
// ]),
Router_Spot.post('/AddSpots',async(req,res)=>{
    try {
        const {spot_name,longitude,latitude,showonhomepage,short_description,full_description,category_id}=req.body;

const sessionID=req.header('sessionID');
console.log(sessionID);
const preData=await pool.query('select * from tbl_spot where spot_name=$1 or (longitude=$2 and lattitude=$3) and category_id=$4',[spot_name,longitude,latitude,category_id]);

if(preData.rowCount>0){
    res.status(403).json('Data Already Exist');
}else{
    // Process file uploads to Cloudinary
    const iconImage = req.files.iconImage;
    const bannerImage = req.files.bannerImage;
    // Upload iconImage and bannerImage to Cloudinary
    const iconImageResult = await cloudinary.uploader.upload(iconImage.tempFilePath,(err,res)=>{
        console.log(err);
    });
    
    const bannerImageResult = await cloudinary.uploader.upload(bannerImage.tempFilePath,(err,res)=>{
        console.log(err);
    });
    // const data=await pool.query('insert into tbl_spot(category_id,spot_name,isactive,icon_image,banner_image,longitude,lattitude,showonhomepage,full_description,short_description,createddate,createdby) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,now(),$11) returning *',[category_id,spot_name,true,req.files.iconImage[0].path,req.files.bannerImage[0].path,longitude,latitude,showonhomepage,full_description,short_description,sessionID])
    const data=await pool.query('insert into tbl_spot(category_id,spot_name,isactive,icon_image,banner_image,longitude,lattitude,showonhomepage,full_description,short_description,createddate,createdby) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,now(),$11) returning *',[category_id,spot_name,true,iconImageResult.secure_url,bannerImageResult.secure_url,longitude,latitude,showonhomepage,full_description,short_description,sessionID])
    if(data.rowCount>0){
        res.status(200).json(data.rows);
    }
}
    } catch (error) {
        res.status(500).json('Something went Wrong');
    }

})


//to get all the spots
Router_Spot.get('/',async(req,res)=>{
    const data=await pool.query('select * from tbl_Spot where isactive=true');
    if(data.rowCount>0){
        res.json(data.rows).status(200);
    }
})

//to delete the spot
Router_Spot.put('/DeleteSpot/:id',async(req,res)=>{
    try {
        const {id}=req.params;
    const sessionID=req.header('sessionID');
    if(!id&&!sessionID){
        res.status(401).json('please provide the values');
    }else{
        const data=await pool.query('update tbl_spot set isactive=$1, deletedby=$2,deleteddate=now() where spot_id=$3 returning *',[false,sessionID,id]);
        if(data.rowCount>0){
            res.status(200).json('Deleted Successfully');
        }else{
            res.status(500).json('Something went wrong');
        }
    }
    } catch (error) {
        res.status(500).json('Something went wrong');
    }
    
})
//to update the spot 
// ,upload.fields([
//     {name:'iconImage',maxCount:1},
//     {name:'bannerImage',maxCount:1}
// ])
Router_Spot.put('/UpdateSpot/:id',async(req,res)=>{
    
    try {
        // console.log('calling');
        const {id}=req.params;
    // console.log(id);
    const {spot_name,longitude,latitude,showonhomepage,short_description,full_description,category_id}=req.body;
    // console.log(req.body);
    const sessionID=req.header('sessionID');
    // console.log(sessionID);
    if(!id&&!sessionID){
        res.status(401).json('please provide the values');
    }else{
        let query;
        let queryParms;
        let iconImagePath = null;
        let bannerImagePath = null;
        // if (req.files.iconImage && req.files.iconImage.length > 0) {
        //     iconImagePath = req.files.iconImage[0].path;
        // }
        // if (req.files.bannerImage && req.files.bannerImage.length > 0) {
        //     bannerImagePath = req.files.bannerImage[0].path;
        // }
        // Process file uploads to Cloudinary
        const iconImage = req.files.iconImage;
        const bannerImage = req.files.bannerImage;
        // Upload iconImage and bannerImage to Cloudinary
        const iconImageResult = await cloudinary.uploader.upload(iconImage.tempFilePath,(err,res)=>{
            console.log(err);
        });
        
        const bannerImageResult = await cloudinary.uploader.upload(bannerImage.tempFilePath,(err,res)=>{
            console.log(err);
        });
        
        // if(iconImagePath&&bannerImagePath){
        //    query='update tbl_spot set category_id=$1,spot_name=$2,icon_image=$3,banner_image=$4,longitude=$5,lattitude=$6,showonhomepage=$7,full_description=$8,short_description=$9,updateddate=now(),updatedby=$10 where spot_id=$11 returning *';
        //    queryParms=[category_id,spot_name,iconImagePath,bannerImagePath,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id];
        // }
        // else if(bannerImagePath){
        //     query='update tbl_spot set category_id=$1,spot_name=$2,banner_image=$3,longitude=$4,lattitude=$5,showonhomepage=$6,full_description=$7,short_description=$8,updateddate=now(),updatedby=$9 where spot_id=$10 returning*';
        //     queryParms=[category_id,spot_name,bannerImagePath,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id]
        // }else if(iconImagePath){
        //     query='update tbl_spot set category_id=$1,spot_name=$2,icon_image=$3,longitude=$4,lattitude=$5,showonhomepage=$6,full_description=$7,short_description=$8,updateddate=now(),updatedby=$9 where spot_id=$10 returning *';
        //     queryParms=[category_id,spot_name,iconImagePath,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id]
        // }else{
        //     query='update tbl_spot set category_id=$1,spot_name=$2,longitude=$3,lattitude=$4,showonhomepage=$5,full_description=$6,short_description=$7,updateddate=now(),updatedby=$8 where spot_id=$9 returning *';
        //     queryParms=[category_id,spot_name,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id]
        // }
        
        // const data=await pool.query(query,queryParms);
        // if(data.rowCount>0){
        //     res.status(200).json('Spot Updated Successfully');

        // }else{
        //     res.status(403).json('Something went wrong');
        // }
         if(iconImageResult&&bannerImageResult){
           query='update tbl_spot set category_id=$1,spot_name=$2,icon_image=$3,banner_image=$4,longitude=$5,lattitude=$6,showonhomepage=$7,full_description=$8,short_description=$9,updateddate=now(),updatedby=$10 where spot_id=$11 returning *';
           queryParms=[category_id,spot_name,iconImageResult.secure_url,bannerImageResult.secure_url,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id];
        }
        else if(bannerImageResult){
            query='update tbl_spot set category_id=$1,spot_name=$2,banner_image=$3,longitude=$4,lattitude=$5,showonhomepage=$6,full_description=$7,short_description=$8,updateddate=now(),updatedby=$9 where spot_id=$10 returning*';
            queryParms=[category_id,spot_name,bannerImageResult.secure_url,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id]
        }else if(iconImageResult){
            query='update tbl_spot set category_id=$1,spot_name=$2,icon_image=$3,longitude=$4,lattitude=$5,showonhomepage=$6,full_description=$7,short_description=$8,updateddate=now(),updatedby=$9 where spot_id=$10 returning *';
            queryParms=[category_id,spot_name,iconImageResult.secure_url,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id]
        }else{
            query='update tbl_spot set category_id=$1,spot_name=$2,longitude=$3,lattitude=$4,showonhomepage=$5,full_description=$6,short_description=$7,updateddate=now(),updatedby=$8 where spot_id=$9 returning *';
            queryParms=[category_id,spot_name,longitude,latitude,showonhomepage,full_description,short_description,sessionID,id]
        }
        
        const data=await pool.query(query,queryParms);
        if(data.rowCount>0){
            res.status(200).json('Spot Updated Successfully');

        }else{
            res.status(403).json('Something went wrong');
        }
    }
    } catch (error) {
        res.status(403).json('Something went wrong');
    }
    
})
//to get the spot by id 
Router_Spot.get('/GetSpotById/:id',async(req,res)=>{
    const {id}=req.params;
    if(id !=null){
        const data=await pool.query('select * from tbl_spot where spot_id=$1',[id]);
        if(data.rows){
            res.status(200).json(data.rows);
            
        }else{
            res.status(404).json('No Record Exist');
        }
    }
})
Router_Spot.get('/nextSpots/:id',async(req,res)=>{
    const {id}=req.params;
    if(id!=null){
const result=await pool.query('select * from tbl_Spot where spot_id <> $1 and isactive=true order by spot_id limit 4',[id]);
if(result.rowCount>0){
    
    res.status(200).json(result.rows);
}
    }else{
        res.status(404).json('Content Not found');
    }
})
module.exports=Router_Spot;
