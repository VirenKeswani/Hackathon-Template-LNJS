const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../passport-config');
const { application } = require('express');
initializePassport(
    passport, 
    email =>  users.find(user => user.email === email),
    id =>  users.find(user => user.id === id)
    )

const users = [];

router.get('/',checkAuthenticated , (req,res) => {
    res.render('index.ejs' , {name : req.user.name});
})


router.get('/login',checkNotAuthenticated , (req,res) => {
    res.render('login.ejs', {
        layout: 'login.ejs'
    });
})

router.post('/login',checkNotAuthenticated ,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))



router.get('/register',checkNotAuthenticated ,(req,res) => {
    res.render('register.ejs', {
        layout: 'register.ejs'
    });
})

router.post('/register', checkNotAuthenticated ,async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        users.push({
            id : Date.now().toString(),
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        })
        res.redirect('/login')
    }
    catch(err){
        console.log(err)
        res.redirect('/register')
    }
    console.log(users)
    //res.send("works")
})


router.delete('/logout', (req,res) => {
    req.logOut();
    res.redirect('/login');
}
)


function checkAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
function checkNotAuthenticated(req,res,next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = router;
