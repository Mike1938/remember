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
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    connection.query("SELECT * FROM users WHERE userID = ?", [id], (err, results) => {
        done(null, results);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.googleKey,
    clientSecret: process.env.secretKey,
    callbackURL: "/auth/google/redirect"
}, (accessToken, refreshToken, profile, done) => {
    connection.query("SELECT * FROM users WHERE userAuthID = ?", [profile.id], (err, results) => {
        if (results.length === 0) {
            const queryStr = `INSERT INTO users (userAuthID, username, authType)  VALUES (?, ?, ?)`
            connection.query(queryStr, [profile.id, profile.displayName, profile.provider],
                (error, results) => {
                    if (error) throw error;
                    connection.query("SELECT LAST_INSERT_ID() AS LastId", (err, results) => {
                        done(null, results[0].LastId);
                    })
                });
        } else {
            console.log(`Welcome ${results[0].username}`)
            done(null, results[0].userID);
        }
    });
}));
