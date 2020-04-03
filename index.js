var express = require('express')
var app = express()
var router = require('./routes.js')
var bodyParser = require('body-parser')

app.use(bodyParser.json())


// works on insonia
app.use(express.urlencoded({
    extended: true
}))

// API-key.
app.use('/', (req, res, next) => {
    let path = req.url
    let apiKey = "Blue"
    if (path.includes(apiKey)) {
        req.body.hasAccess = true
    }
    console.log(req.body)
    next()
})



app.use('/',router)


app.listen(8090, () => {
    console.log("Movie API now listening at port 8090.")
})