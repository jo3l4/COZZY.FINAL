const {Client} = require ('pg')

const Client = new Client ({
    host:"localhoast",
    user: "postgres",
    port: 5432,
    password: "rootUser",
    database: "postgres"
})

Client.connect();

Client.query(`Select * from users` , (err, res)=>{
    if(!err){
        console.log(res.rows);
    }else {
        console.log(err.message);
    }
    Client.end;
})