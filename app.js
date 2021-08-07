const express = require("express");
const app = express();
const mysql = require("mysql");
require('dotenv').config();
const ejs = require("ejs");
const cookieSession = require("cookie-session");
app.set("view engine", 'ejs')

app.get('/', (req, res) => {
    res.render("index");
});




app.listen(3000, () => {
    console.log('Running at port 3000');
})