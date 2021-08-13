const express = require("express");
const passportSetUp = require('./config/passportSetup');
const app = express();
const mysql = require("mysql2");
require('dotenv').config();
const ejs = require("ejs");
const cookieSession = require("cookie-session");
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
app.set("view engine", 'ejs')

app.use('/auth', authRoutes);

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.session]
}));

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
    res.render("index");
});



app.listen(3000, () => {
    console.log('Running at port 3000');
})