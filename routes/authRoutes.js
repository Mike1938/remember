const router = require('express').Router();
const passport = require("passport");
router.use(passport.initialize());

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/logout', (req, res) => {
    res.send('logging out');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    console.log(req.user);
    res.send('hello');
});

module.exports = router;
