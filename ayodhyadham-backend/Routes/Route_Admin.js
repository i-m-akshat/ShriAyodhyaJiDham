const express = require('express');
const Router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwtGen = require('../Services/JWTGen');
const geoip = require('geoip-lite');
const useragent = require('express-useragent');

//to add the Admins
Router.post('/AddAdmin', async (req, res) => {
    const { adminName, fullname, eMail, mobileNo, address, password, stateId, pincode, roleId, cityId, countryId } = req.body;
    console.log(adminName, fullname, eMail, mobileNo, address, password, stateId, pincode, roleId, cityId, countryId);
    const sessionID=req.header('sessionID');
    const preUser = await pool.query('select * from tbl_admin where admin_Name=$1 or full_name=$2 or email=$3', [adminName, fullname, eMail]);

    if (!preUser.rowCount === 0) {
        res.status(500).json('user already exist');
    } else {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPwd = await bcrypt.hash(password, salt);
        console.log(hashedPwd);
        const adminData = await pool.query('insert into tbl_admin(admin_name,full_name,email,mobileno,address,password,state_id,pincode,isactive,roleid,city_id,country_id,createddate,createdby) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,now(),$13) returning *', [adminName, fullname, eMail, mobileNo, address, hashedPwd, stateId, pincode, true, roleId, cityId, countryId,sessionID]);
        console.log(adminData.rows);
        if (adminData.rows) {
            res.status(200).json(adminData);
        } else {
            res.status(401).json('Something went wrong');
        }
    }
})

//for admin Login

Router.post('/', async (req, res) => {
    try {
        const { adminName, password } = req.body;
       
        const ip = req.ip; // Get IP address
        const location = geoip.lookup(ip); // Get location based on IP address
        console.log("password is "+password);
        // Parse device type from User-Agent
        const deviceType = req.useragent.isMobile ? 'Mobile' : (req.useragent.isTablet ? 'Tablet' : 'Desktop');
        //console.log(ip + "," + location + "," + deviceType);
        const userData = await pool.query('SELECT A.*,d.role_name as role_name FROM tbl_admin a inner join tbl_role d on d.role_id=a.roleid where admin_name=$1 and a.isactive=true', [adminName]);
        if (userData.rowCount != 0) {
            const hashedPassword = userData.rows[0].password;
            if (hashedPassword != null) {
                bcrypt.compare(password, hashedPassword).then(async (result) => {
                    console.log(result);
                    if (result === true) {
                        const token = jwtGen(userData.rows[0].admin_id, userData.rows[0].role_name);
                        const adminSession = await pool.query('insert into tbl_adminsession(admin_id,session_start,device_ip_address,device_type,device_location) values($1,now(),$2,$3,$4) returning *', [userData.rows[0].admin_id, ip, deviceType, location]);
                        if (adminSession.rowCount != 0) {
                            console.log(adminSession.rows[0]);
                            return res.status(200).json({ token, name: userData.rows[0].full_name, role: userData.rows[0].role_name, sessionID: adminSession.rows[0].session_id });
                        }
                    }
                     else{
                        throw new Error('Invalid Credentials');
                    }
                }).catch(error => {
                    res.status(401).json(error.message)
                }
                );

            } else {
                throw new Error('Invalid Credentials');
            }

        } else {
            throw new Error('User do not exist in the database');
        }
    } catch (error) {
        res.status(401).json(error.message);
    }

})

//for logout
Router.get('/Logout', async (req, res) => {
    const sessionId = req.header('sessionID');
    console.log(sessionId);
    if (!sessionId) {
        res.status(401).json('session ID required');
    }

    const response = await pool.query('update tbl_adminsession set session_end=now() where session_id=$1 returning *', [sessionId]);
    if (response.rowCount != 0) {
        return res.status(200).json('Logout Successfull');
    }
})


//get all Admins
Router.get('/GetAllAdmin',async(req,res)=>{
    const query=await pool.query('select a.*,b.role_name from tbl_admin a inner join tbl_role b on a.roleid=b.role_id where a.isactive=true');
    if(query.rowCount>0){
        
        res.status(200).json(query.rows);
    }else{
        res.status(404).json('Some Error Occurred');
    }
})

//get the admin by id
Router.get('/SelectAdminById/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const result=await pool.query('select a.*,b.role_name from tbl_admin a inner join tbl_role b on a.roleid=b.role_id  where a.isactive=true and a.admin_id=$1',[id]);
        console.log(result.rowCount);
        if(result.rowCount>0){
            res.status(200).json(result.rows);
        }else{
            res.status(404).json('Some Error Occurred');
        }
    } catch (error) {
     console.log(error);   
    }
})

//to get all Countries
Router.get('/GetCountries',async(req,res)=>{
    const result=await pool.query('select * from tbl_country');
    if(result.rowCount>0){
        res.status(200).json(result.rows);
    }else{
        res.status(404).json('Some Error Occurred');
    }
})

//to get all states
Router.get('/GetStates/:id',async(req,res)=>{
    const {id}=req.params;
    if(id===0){
        res.status(404).json('Please Select a Country');
    }else{
        console.log(id);
        const result=await pool.query('select * from tbl_state where country_id=$1',[id]);
        if(result.rowCount>0){
            res.status(200).json(result.rows);
        }else{
            res.status(404).json('Some Error Occurred');
        }
    }
    
})
//to get all the cities
Router.get('/GetCities/:id',async(req,res)=>{
    const {id}=req.params;
    if(id===0){
        res.status(404).json('Please Select a State');
    }else{
    const result=await pool.query('select * from tbl_city where state_id=$1',[id]);
    if(result.rowCount>0){
        res.status(200).json(result.rows);
    }else{
        res.status(404).json('Cities Not Found');
    }}
})


//to edit the admin
Router.put('/UpdateAdmin/:id',async(req,res)=>{
    const {id}=req.params;
    const sessionID=req.header('sessionID');
    const { adminName, fullname, eMail, mobileNo, address, password, stateId, pincode, roleId, cityId, countryId } = req.body;
    if(id!=0||id!=""||id!=null){
        let query='';
        let param='';
        if(password===''){
             query='update tbl_admin set admin_name=$1,full_name=$2,email=$3,mobileno=$4,address=$5,state_id=$6,pincode=$7,roleid=$8,city_id=$9,country_id=$10,updateddate=now(),updatedby=$11 where admin_id=$12 returning *';
            param=[ adminName, fullname, eMail, mobileNo, address,  stateId, pincode, roleId, cityId, countryId,sessionID,id ];
        }else{
            query='update tbl_admin set admin_name=$1,full_name=$2,email=$3,mobileno=$4,address=$5,password=$6,state_id=$7,pincode=$8,roleid=$9,city_id=$10,country_id=$11,updateddate=now(),updatedby=$12 where admin_id=$13 returning *';
            param=[ adminName, fullname, eMail, mobileNo, address, password, stateId, pincode, roleId, cityId, countryId,sessionID,id ]
        }
        const result=await pool.query(query,param);
        if(result.rowCount>0){
            res.status(200).json(result.rows)
        }else{
            res.status(500).json('Internal Server Error')
        }
    }
})

//to delete admin
Router.put('/DeleteAdmin/:id',async(req,res)=>{
    const {id}=req.params;
    const sessionID=req.header('sessionID');
    if(id===0){
        res.status(404).json('Please Select a State');
    }else{
    const result=await pool.query('update tbl_admin set isactive=false,deleteddate=now(),deletedby=$2 where admin_id=$1 and isactive=true',[id,sessionID])
    if(result.rowCount>0){
        res.status(200).json(result.rows);
    }else{
        res.status(404).json('Some Error Occurred');
    }}
})
module.exports = Router;