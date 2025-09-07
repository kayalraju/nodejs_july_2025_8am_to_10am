const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));

const multer = require('multer');
const path = require('path');
const CsvController = require('../controller/CsvController');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/csvupload'),function(error,success){
            if(error) throw error;
        })
        
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})

const upload=multer({storage:storage})


router.post('/csv/create',upload.single('file'),CsvController.createCsvdata)
router.get('/csv',CsvController.getCsvdata)


module.exports = router;