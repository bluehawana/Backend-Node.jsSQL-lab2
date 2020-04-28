const express = require('express')
const app = express()
const pool = require('./pool.js')

app.get('/', (req, res) => {
    res.send("Join tablets Actors,Actor-Movies,Movies")
})
app.get('/movies', (req, res) => {
    
    let sqlString = req.query.awards ? " where Movies.awards = ?" : ""
    let movieID = req.query.awards
    

    let query = `SELECT Title,Director,Actors.actorName,Awards From Movies 
    JOIN Actors_Movies ON Actors_Movies.Movie_ID=Movies.ID 
    JOIN Actors ON Actors.ID=Actors_Movies.Actor_ID`+ sqlString

    pool((err, connection) => {
        
        connection.query(query,[movieID], function(error, result) {
            connection.release()
             
              if (err) throw err
            
              res.json(result)
          })
      })
  })

  app.listen(3000, () => {
      console.log("Listen on port:3000")
  })
