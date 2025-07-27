require('dotenv').config();
const express = require('express');

const app = express();



// Importing the home router
const homeRouter = require('./app/router/homeRouter');
app.use(homeRouter);

const PORT=process.env.PORT || 3006
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})