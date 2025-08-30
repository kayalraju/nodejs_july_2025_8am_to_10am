const express= require('express');
const EjsController = require('../controller/EjsController');


const router=express.Router()


router.get('/student/list',EjsController.listStudent)
router.get('/student/add',EjsController.addStudent)
router.post('/student/create',EjsController.createStudent)
router.get('/student/edit/:id',EjsController.editStudent)
router.post('/student/update/:id',EjsController.updateStudent)
router.get('/student/delete/:id',EjsController.deleteStudent)




module.exports = router;