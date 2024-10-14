const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
router.use(express.urlencoded({ extended: false } ));


 router.post('/user/signup', (req, res)=> {  
    userController.signup(req, res);
 })
 router.post('/user/login', (req, res)=> {  
    userController.login(req, res);
 })
 router.put('/user/changepassword/:id', (req, res)=> {  
    userController.changePassword(req, res);
 })

module.exports = router