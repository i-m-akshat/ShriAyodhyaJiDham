const Pool=require('pg').Pool;
require('dotenv').config();
const pool=new Pool(
    {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD, // No need for template literals
        port: process.env.DB_PORT
        // user:"postgres",
        // password:"4756",
        // host:"localhost",
        // port:5432,
        // database:"ShreeAyodhyaDham"
}
)
module.exports=pool;