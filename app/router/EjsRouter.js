const express= require('express');
const EjsController = require('../controller/EjsController');


const router=express.Router()


router.get('/student/list',EjsController.listStudent)
router.get('/student/add',EjsController.addStudent)
router.post('/student/create',EjsController.createStudent)




module.exports = router;