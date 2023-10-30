const mongoose = require('mongoose');
const nodemailer=require('nodemailer');

const fileSchema = mongoose.Schema({
    name:{type:String,required:true},
    imageUrl:{type:String},
    tags:{type:String},
    emails:{type:String}
});

fileSchema.post("save",async function(doc){
    try{
        console.log("Post Save Hook Called");
        console.log("doc",doc);

        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        });

        let info=await transporter.sendMail({
            from:`Test mail from Sanyam`,
            to:doc.emails,
            subject:"New File Upload on Cloudinary",
            html:`<h2>Hello,file Uploaded on Cloudinary</h2>`
        });
        console.log(info);
    }catch(err){
        console.log(err);
    }
})

const File=mongoose.model('File',fileSchema);
module.exports=File;