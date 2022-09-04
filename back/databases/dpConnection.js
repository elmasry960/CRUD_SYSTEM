const mysql2 = require("mysql2");
const q = mysql2.createConnection({
    host: "localhost",
    database: "crud",
    user: "root",
    password: ''
})

module.exports=q;