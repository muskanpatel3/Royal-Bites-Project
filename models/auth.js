const express = require('express');
const router = express.Router();

// Login Request Handle
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`User Logged In: ${email}`);
    res.redirect('/');
});

// Signup Request Handle
router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`User Signed Up: ${name} - ${email}`);
    res.redirect('/login');
});

module.exports = router;
