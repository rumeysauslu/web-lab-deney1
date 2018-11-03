var express = require('express');
var mysql = require('mysql');
var db = express();
var path    = require("path");
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
db.use(bodyParser.urlencoded({ extended: false }));
db.use(bodyParser.json());
const PORT=8080; 
   
let connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs_user'
});

connect.connect(function (err) {
    if(err) throw err;
    console.log("Connected!");
})

db.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/nodejs.html'));
});

db.post('/myFormAction', 
    function(req, res) {
        var name=req.body.name;
        var surname=req.body.surname;
        var email=req.body.email;
        let sqlSorgusu = "INSERT INTO kisiler (kisi_adi, kisi_soyadi, kisi_eposta )  VALUE('"+name+"', '"+surname+"','"+email+"')";
        connect.query(sqlSorgusu, function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        });
        res.sendFile(path.join(__dirname+'/nodejs.html'));
    }
);

db.listen(8080);
console.log("Running at Port 8080");
