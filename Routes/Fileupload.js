const express=require('express');
const router=express.Router();

const {localUpload,imagesUpload,imageSizeReducer}=require('../Controllers/fileupload');

router.post('/image',imagesUpload);
router.post('/local',localUpload);
router.post('/reduce',imageSizeReducer);

module.exports=router;