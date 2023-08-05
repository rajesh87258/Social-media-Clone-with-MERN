const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts =require('express-ejs-layouts');
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');




app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

//MAKE THE UPLOADS PATH AVAILABLE TO THE BROWSER
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//extract style and scripts from sub pages ino the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//SET UP THE VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('views', './views');


//MONGO IS USED TO STORE THE SESSION COOKIE IN THE DB
app.use(session({
    name:'codeial',
    //TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PRODUCTION MODE
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    } ,store: MongoStore.create(
        {
          mongoUrl: 'mongodb://127.0.0.1:27017/insta_talk',
    
        autoRemove: 'disabled'
     },
     function(err){
         console.log(err || 'connect-mongodb setup ok');
     })
        
    
   

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);
//USE EXPRESS ROUTER
app.use('/', require('./routes'));



app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is Running on The Port: ${port}`);
});