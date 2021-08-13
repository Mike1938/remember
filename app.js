const express = require("express");
const passportSetUp = require('./config/passportSetup');
const app = express();
const mysql = require("mysql2");
require('dotenv').config();
const ejs = require("ejs");
const cookieSession = require("cookie-session");
const authRoutes = require('./routes/authRoutes');
app.set("view engine", 'ejs')

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render("index");
});



app.listen(3000, () => {
    console.log('Running at port 3000');
})