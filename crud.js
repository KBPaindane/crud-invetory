const express = require('express');
const bodyParser = require('body-parser');
const crud = express();
const mysql = require('mysql');


/* ----------------------------------
----------------------------------
---------------------------------
Parse Application/json
-----------------------------------
-----------------------------
--------------------------*/
crud.use(bodyParser.json());
/* ----------------------------------
----------------------------------
---------------------------------
Database Connection
-----------------------------------
-----------------------------
--------------------------*/
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root', /* MySQL User */
    password: 'root', /* MySQL Password */
    database: 'inventory' /* MySQL Database */
});

/* ----------------------------------
---------------------------------
Show MYSQL connection
-------------------------------------
---------------------------------*/
conn.connect((err)=> {
    if (err) throw err;
    console.log('MYSQL is connected with Application')
});


//GET ALL ITEMS
crud.get('/api/orders',(req,res) => {
    let sqlQuery =  'SELECT * FROM order';

    let query = conn.query(sqlQuery, (err,results)=>{
        if(err) throw err;
        res.send(apiResponse(results));
    });
});

//Create
crud.post('/api/orders', (req,res) => {
    let data = { name: req.body.name, barcode: req.body.barcode, make: req.body.make, imei_no: req.body.imei_no, price: req.body.price };

    let sqlQuery = 'INSERT INTO order (name, barcode, make,imei_no, price) Values (?, ?, ?, ?, ?)';


    let query = conn.query(sqlQuery, (err,results)=>{
        if(err) throw err;
        res.send(apiResponse(results));
    });
});


