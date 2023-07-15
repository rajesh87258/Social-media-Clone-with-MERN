const express = require('express');
const app = express();
const port = 8000;

//USE EXPRESS ROUTER
app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is Running on The Port: ${port}`);
});