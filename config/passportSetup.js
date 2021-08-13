const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config();
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

passport.use(new GoogleStrategy({
    clientID: process.env.googleKey,
    clientSecret: process.env.secretKey,
    callbackURL: "/auth/google/redirect"
}, (token, tokenSecret, profile, done) => {

}));