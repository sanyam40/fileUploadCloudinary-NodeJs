const express=require('express');
const app=express();
const fileupload=require('express-fileupload');
const Upload=require('./Routes/Fileupload');
require('dotenv').config();
require('./Config/database').connect();
require('./Config/cloudinary').cloudinaryConnect();

app.use(express.json());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

app.use('/api/v1/upload',Upload);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
});