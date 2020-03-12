const Pool = require('pg').Pool;

const pool = new Pool({  
    host: 'localhost',  
    user: 'postgres',  
    database: 'actors',  
    password: 'admin',
    port: 5432,
    ssl: false
});  

module.exports = pool;