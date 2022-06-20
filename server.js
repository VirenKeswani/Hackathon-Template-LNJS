if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');



const passport = require('passport');



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
//app.use(bcrypt)
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
//use bcrypt

const indexRouter = require('./routes/index.js');



//take forms from the login.ejs and send them to the server.js


app.use('/', indexRouter)


app.listen(3000)