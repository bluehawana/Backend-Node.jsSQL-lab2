const express = require('express')
const app = express()
const router = express.Router()
const mysql = require('mysql')


let connection = mysql.createConnection({
    host: 'localhost',
    user: 'bluehawana',
    password: '2Dh9pZzxBPgRfaOK',
    database: 'Films',
    multipleStatements: true
})

const setupQuery = "CREATE DATABASE IF NOT EXISTS Films COLLATE = utf8mb4_swedish_ci; CREATE TABLE IF NOT EXISTS Movies (ID int(11) AUTO_INCREMENT PRIMARY KEY, Title varchar(120) DEFAULT NULL, Year year(4) DEFAULT NULL, Director varchar(30) DEFAULT NULL, Awards varchar(30) DEFAULT NULL);INSERT INTO `Movies` (`ID`, `Title`, `Year`, `Director`,`Awards`) VALUES(1,'Wanda',1987,'Roxane Grigoli'), (2,'Plácido',1993,'Sherm Sissons','Oscar'),(3,'Changing Habits',2002,'Stan Collis'), (4,'Ulysses',1996,'Griswold Doylend'), (5,'Alps (Alpeis)',2008,'Terri-jo OShaughnessy','Oscar'),(6,'Three to Tango',2007,'Adler Jandourek'), (7,'Wilby Wonderful',1997,'Rudolf Humerstone'),(8,'Octopus The (Le poulpe)',2006,'Kip Prescot'), (9,'And Soon the Darkness',2006,'Morly Plomer'), (10,'The Castle of Fu Manchu',2011,'Faunie Nordass'),(11,'Banishment The (Izgnanie)',2012,'Joaquin Semarke','Golden Globe Awards'),(12,'Prom Night in Mississipp',1988,'Drucill Hiddsley'), (13,'Ghost The',2006,'Ignacius Scimonelli'), (14,'Mall',2007,'Danit Mahomet'), (15,'Once Upon a Time in China II','Wong Fei-hung Ji Yi'),(16,'Naam yi dong ji keung',2009,'Abel Larner'),(16,'City Island',2003,'Franny Sickling','Golden Globe Awards'),(17,'Cazuza - O Tempo Não Pára',2004,'Onfre Conningham'),(18,'Werewolf Woman (La lupa mannara)',2007,'Carl Capp'),(19,'I, Monster',2005,'Coop Genicke'),(20,'Too Many Husbands',1994,'Therese Mutter') ON DUPLICATE KEY UPDATE id = (id + 0)";



// start to connect the serve5
connection.connect()

router.get('/?[a-zA-Z]{0,5}/', (req, res) => {
    res.send("Movie API")
})

router.get('/setup', (req, res) => {
    connection.query(setupQuery, (err, result) => {
        if (err) throw err

        if (result.length == 3)
            res.send("Database or table är saved/updated.")
    })
})

router.route('/?[a-zA-Z]{0,5}/movies/:movieID')
    .get((req, res) => {
        let sql = "SELECT * FROM Movies WHERE id =" + connection.escape(req.params.movieID)

        connection.query(sql, (err, result, fields) => {
            if (err) throw err
            res.json(result)
        })
    })
    .put((req, res) => {
        if (req.body.hasAccess)
            updatePost(req, res)
    })
    .patch((req, res) => {
        if (req.body.hasAccess)
            updatePost(req, res)
    })
    .delete((req, res) => {
        if (req.body.hasAccess) {
            let sql = "DELETE FROM Movies WHERE id =" + connection.escape(req.params.movieID)
            connection.query(sql, (err, result, fields) => {
                if (err) throw err
                res.json(result)
            })
        }
    })

router.route('/?[a-zA-Z]{0,5}/movies')
    .get((req, res) => {
        connection.query('SELECT * FROM Movies', (err, result, fields) => {
            if (err) throw error
            res.json(result)
        })
    })
    .post((req, res) => {
        if (req.body.hasAccess) {
            let columns = []
            let values = []
            for (let column in req.body) {
                if (column != 'hasAccess') {
                    columns.push(column)
                    values.push(req.body[column])
                }
            }
            let sql = 'INSERT INTO Movies (??) VALUES (?)'
            sql = mysql.format(sql, [columns, values])
            connection.query(sql, (err, result, fields) => {
                if (err) throw err
                res.json(result)
            })
        } else {
            res.status(401).send("None")
        }
    })

function updatePost(req, res) {

    
    let sql = 'UPDATE Movies SET ? WHERE id =' + connection.escape(req.params.movieID)
    connection.query(sql, req.body, (err, result, fields) => {
        if (err) throw err
        res.json(result)
    })
}

module.exports = router
