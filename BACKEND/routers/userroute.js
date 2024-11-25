const express = require('express');
const userRouter = express.Router();

const { userlogin, userregister, adminlogin } = require('../controllers/user');

userRouter.post('/register', userregister);
userRouter.post('/login', userlogin);
userRouter.post('/admin', adminlogin);

module.exports = userRouter;
