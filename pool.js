var mysql=require('mysql')
var pw=require('./pw.js')

const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:pw.user,
    password:pw.password,
    database:'Films'
})

let getConnection=function(callback){
    pool.getConnection(function(err,connection){
        callback(err,connection)
    })
}

module.exports=getConnection

/*var con = mysql.createConnection({
    host: "localhost",
    user: "bluehawana",
    password: "2Dh9pZzxBPgRfaOK"
    });
    
    /*con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });*/
      /*getConnection.query("select * from Films.Movies", function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
      });*/ 