// server/index.js
'use strict';

const app = require('./app');

const PORT = process.env.PORT || 9000;






var mysql = require('mysql');
var con = mysql.createConnection({
    server: "127.0.0.1",
    port: "3306",
    database: "business-in",
    user: "root",
    password: "",
    host: "localhost",

});

app.listen(9000,'0.0.0.0', () => {
  console.log(`App listening on port ${PORT}!`);


});

