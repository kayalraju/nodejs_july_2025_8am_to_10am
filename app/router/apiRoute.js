const express= require('express');
const ApiController = require('../controller/ApiController');
const studentImageUploads = require('../helper/studentImage');


const router=express.Router()


router.post('/create/student',studentImageUploads.single('image'),ApiController.createStudent)
router.get('/student',ApiController.getallStudent)
router.get('/edit/student/:id',ApiController.singleStudent)
router.post('/update/student/:id',ApiController.updateStudent)
router.delete('/delete/student/:id',ApiController.deleteStudent)

//search student
router.get('/search/student',ApiController.searchStudent)

module.exports = router;