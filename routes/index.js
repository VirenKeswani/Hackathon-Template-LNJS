const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('index.ejs' , {name : 'John'});
})


router.get('/login',(req,res) => {
    res.render('login.ejs', {
        layout: 'login.ejs'
    });
})

router.get('/register',(req,res) => {
    res.render('register.ejs', {
        layout: 'register.ejs'
    });
})


module.exports = router;
