const express=require('express');
const Router_Event=express.Router();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary=require('../Services/CloudinaryConfig');
const pool=require('../db')
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
// })///for multer
//for cloudinary////
const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'uploads/images',
        allowedFormats: ['jpg', 'png', 'jpeg'],
    }
})
const upload=multer({storage});

// ,upload.fields([
//     {name:'iconImage',maxCount:1},
//     {name:'bannerImage',maxCount:1}
// ])
Router_Event.post('/AddEvent',async(req,res)=>{
    try {
        const {spot_id,Event_name,showonhomepage,short_description,full_description,event_date}=req.body;
const sessionID=req.header('sessionID');

const preData=await pool.query('select * from tbl_events where event_name=$1 and isactive=true',[Event_name]);

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
    // const data=await pool.query('insert into tbl_events(spot_id,event_name,isactive,icon_image,banner_image,showonhomepage,full_description,short_description,createddate,createdby,event_date) values($1,$2,$3,$4,$5,$6,$7,$8,now(),$9,$10) returning *',[spot_id,Event_name,true,req.files.iconImage[0].path,req.files.bannerImage[0].path,showonhomepage,full_description,short_description,sessionID,event_date])
    const data=await pool.query('insert into tbl_events(spot_id,event_name,isactive,icon_image,banner_image,showonhomepage,full_description,short_description,createddate,createdby,event_date) values($1,$2,$3,$4,$5,$6,$7,$8,now(),$9,$10) returning *',[spot_id,Event_name,true,iconImageResult.secure_url,bannerImageResult.secure_url,showonhomepage,full_description,short_description,sessionID,event_date])
    if(data.rowCount>0){
        res.status(200).json(data.rows);
    }
}
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went Wrong');
    }
})

//to get all the Events
Router_Event.get('/',async(req,res)=>{
    const data=await pool.query('select * from tbl_events where isactive=true');
    if(data.rowCount>0){
        res.json(data.rows).status(200);
    }
})

//to Delete
Router_Event.put('/DeleteEvent/:id',async(req,res)=>{
    try {
        const {id}=req.params;
    const sessionID=req.header('sessionID');
    if(!id&&!sessionID){
        res.status(401).json('please provide the values');
    }else{
        const data=await pool.query('update tbl_events set isactive=$1, deletedby=$2,deleteddate=now() where event_id=$3 returning *',[false,sessionID,id]);
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
//to Update
// ,upload.fields([
//     {name:'iconImage',maxCount:1},
//     {name:'bannerImage',maxCount:1}
// ])
Router_Event.put('/UpdateEvent/:id',async(req,res)=>{
    try {
        const {id}=req.params;
    console.log(id);

    const {Event_name,showonhomepage,short_description,full_description,spot_id,event_date}=req.body;
    console.log(req.body);
    const sessionID=req.header('sessionID');
    console.log(sessionID);
    if(!id&&!sessionID){
        res.status(401).json('please provide the values');
    }else{
        let query;
        let queryParms;
        let iconImagePath = null;
        let bannerImagePath = null;
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
        if (iconImageResult && bannerImageResult.secure_url.length > 0) {
            iconImagePath = iconImageResult.secure_url;
        }
        if (bannerImageResult && bannerImageResult.secure_url.length > 0) {
            bannerImagePath = bannerImageResult.secure_url;
        }
        if(iconImagePath&&bannerImagePath){
           query='update tbl_events set spot_id=$1,event_name=$2,icon_image=$3,banner_image=$4,showonhomepage=$5,full_description=$6,short_description=$7,updateddate=now(),updatedby=$8,event_date=$10 where event_id=$9 returning *';
           queryParms=[spot_id,Event_name,iconImagePath,bannerImagePath,showonhomepage,full_description,short_description,sessionID,id,event_date];
        }
        else if(bannerImagePath){
            query='update tbl_events set spot_id=$1,event_name=$2,banner_image=$3,showonhomepage=$4,full_description=$5,short_description=$6,updateddate=now(),updatedby=$7,event_date=$9 where event_id=$8 returning*';
            queryParms=[spot_id,Event_name,bannerImagePath,showonhomepage,full_description,short_description,sessionID,id,event_date]
        }else if(iconImagePath){
            query='update tbl_events set spot_id=$1,event_name=$2,icon_image=$3,showonhomepage=$4,full_description=$5,short_description=$6,updateddate=now(),updatedby=$7,event_date=$9 where event_id=$8 returning *';
            queryParms=[spot_id,Event_name,iconImagePath,showonhomepage,full_description,short_description,sessionID,id,event_date]
        }else{
            query='update tbl_events set spot_id=$1,event_name=$2,showonhomepage=$3,full_description=$4,short_description=$5,updateddate=now(),updatedby=$6,event_date=$8 where event_id=$7 returning *';
            queryParms=[spot_id,Event_name,showonhomepage,full_description,short_description,sessionID,id,event_date]
        }
        
        const data=await pool.query(query,queryParms);
        if(data.rowCount>0){
            res.status(200).json('Event Updated Successfully');

        }else{
            res.status(403).json('Something went wrong');
        }
    }
    } catch (error) {
        console.log(error);
        res.status(403).json('Something went wrong');
    }
    
})
//to get event by id
Router_Event.get('/GetEventById/:id',async(req,res)=>{
    const {id}=req.params;
    if(id !=null){
        const data=await pool.query('select b.spot_name,a.* from tbl_events a inner join tbl_spot b on a.spot_id=b.spot_id where event_id=$1 and a.isactive=true',[id]);
        if(data.rows){
            res.status(200).json(data.rows);

        }else{
            res.status(404).json('No Record Exist');
        }
    }
})
//to get upcoming events
Router_Event.get('/GetUpcomingEvents/',async(req,res)=>{
    try {
        const result=await pool.query('select * from tbl_events where event_date>now() and isactive=true');
        if(result.rowCount>0){
            res.json(result.rows).status(200);
        }else{
            console.log(result.rowCount);
            res.json('Some Error Occurred').status(500);
        }
        
    } catch (error) {
        res.json('Some Error Occurred').status(500);
    }
})
Router_Event.get('/nextEvents/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        console.log(id);
    if(id !=null){
        const result=await pool.query('select * from tbl_events where event_id>$1 and isactive=true',[id]);
        if(result.rowCount>0){
            res.json(result.rows).status(200);
        }else{
            res.json('Some Error Occurred').status(500);
        }
    }
    } catch (error) {
        
    }
})
module.exports=Router_Event;