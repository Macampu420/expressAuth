const express = require('express');
const router = express.Router();
const AuthCls = require('./../models/AuthCls');
const objAuth = new AuthCls();
router.post('/signIn', (req, res) => {
    objAuth.signIn(req, res);
});

router.post('/signUp', (req, res) =>{
    objAuth.signUp(req, res);
});

module.exports = router;