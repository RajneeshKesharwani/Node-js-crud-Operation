//Query -> only using for front-end approach purpose 
//structure -> http://localhost:4450/account?user=raju&pass=1234

//params -> backend router approach purpose (:params)
//structure-> http:localhost:5400/api/user/:id/course/:title

//module -> controller -> route -> server

//server integrated frontend
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db')


const app = express()  //express instance

const PORT = process.env.PORT

//config setup for view engine

app.set('view engine','ejs')
app.set('views','./view')

//static directory
app.use(express.static('./view'))

//middleware
app.use(express.urlencoded({extended:true})) 
app.use(express.json())//incoming data = req.body,req.query,req.params,req.file
app.use(cors())

app.use(`/`,require('./route/appRoute')) //index route home route 

// Page not found Page 

app.all('**', (req,res) => {
    res.render('pnf.ejs')
})


//start the server 
app.listen(PORT,async () => {
    await connectDB()
    console.log(`server is ready @ http://localhost:${PORT}`)
})