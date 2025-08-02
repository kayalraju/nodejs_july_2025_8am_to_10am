require('dotenv').config();
const express = require('express');
const ejs = require('ejs');

const app = express();



//setup ejs as the template engine

app.set("view engine", "ejs");
app.set('views','views')


//create static folder
app.use(express.static('public'));


// Importing the home router
const homeRouter = require('./app/router/homeRouter');
app.use(homeRouter);

const PORT=process.env.PORT || 3006
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})