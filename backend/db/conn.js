const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'disaster',
    password: 'igiveup',
    port: 5432,
});

async function check(){
    await client.connect()      
}

check().then(()=>{console.log("Connected to database")})
module.exports = client;