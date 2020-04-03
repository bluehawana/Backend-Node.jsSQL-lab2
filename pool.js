var mysql=require('mysql')
var pw=require('./pw.js')

const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:pw.user,
    password:pw.pasword,
    database:'Movies'
})

let getConnection=function(callback){
    pool.getConnection(function(err,connection){
        callback(err,connection)
    })
}

module.exports=getConnection