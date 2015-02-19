var express = require('express');
var signupRouter = require('./signup/signup-router.js');
var loginRouter = require('./login/login-router.js');
var logoutRouter = require('./logout/logout-router.js');
var authRouter = express.Router();

// router for user signups
authRouter.use('/signup', signupRouter);

// router for user login
authRouter.use('/login', loginRouter);

// router for user logout
authRouter.use('/logout', logoutRouter);

module.exports = authRouter;
