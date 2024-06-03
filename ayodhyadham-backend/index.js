const express=require('express');
const cors=require('cors');
const JWT=require('jsonwebtoken');
const useragent = require('express-useragent');

const category_Router=require('./Routes/Route_Category');
const admin_Router=require('./Routes/Route_Admin');
const verification_Router=require('./Routes/Route_Validation');
const Router_Spot = require('./Routes/Route_Spot');
const Router_Event=require('./Routes/Route_Event');
const Router_Role=require('./Routes/Route_Role');
const Port=7000;


const app=express();
app.listen(Port,(req,res)=>{
    console.log('server is listening at ' + Port)
})

//cors is a function hence use it like u use a function 
app.use(cors());
app.use(useragent.express());
//app.use('/uploads/images', express.static('uploads/images'));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
//always place express.json() above the router handler 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/manageCategory/',category_Router);
app.use('/manageRole/',Router_Role);
app.use('/manageAdmin/',admin_Router);
app.use('/verify/',verification_Router);
app.use('/manageSpot/',Router_Spot);
app.use('/manageEvent/',Router_Event)

