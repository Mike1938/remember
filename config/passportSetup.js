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
}, (accessToken, refreshToken, profile, done) => {
    connection.query("SELECT * FROM users WHERE userID = ?", [profile.id], (err, results) => {
        if (results.length === 0) {
            const queryStr = `INSERT INTO users (userID, username, authType)  VALUES (?, ?, ?)`
            connection.query(queryStr, [profile.id, profile.displayName, profile.provider],
                (error, results) => {
                    if (error) throw error;
                    console.log(results);
                })
        } else {
            console.log(`Welcome ${results[0].username}`)
        }
    });
}));
