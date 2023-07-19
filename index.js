const express = require('express');
const app = express();
const port = 8000;
const expressLayouts =require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages ino the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//USE EXPRESS ROUTER
app.use('/',require('./routes'));


//SET UP THE VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is Running on The Port: ${port}`);
});