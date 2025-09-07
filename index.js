require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const dbCon=require('./app/config/dbCon')
const cors=require('cors')
const path=require('path')

const app = express();
dbCon()


//cose
app.use(cors())
//setup ejs as the template engine

app.set("view engine", "ejs");
app.set('views','views')

//middleware use
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//create static folder
app.use(express.static('public'));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use('/uploads',express.static('uploads'));


// Importing the home router
const homeRouter = require('./app/router/homeRouter');
app.use(homeRouter);

//create a api route

const ApiRoute=require('./app/router/apiRoute')
app.use('/api',ApiRoute)

const EjsRoute=require('./app/router/EjsRouter')
app.use(EjsRoute)

const CsvRoute=require('./app/router/csvRouter')
app.use(CsvRoute)

const PORT=process.env.PORT || 3006
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})