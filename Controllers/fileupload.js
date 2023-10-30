const File=require('../Models/File');
const cloudinary=require('cloudinary').v2;

exports.localUpload=async(req,res)=>{
    try{     
        const file=req.files.file;
        
        let path=__dirname+"/files/"+Date.now()+file.name; 
        console.log(path);

        file.mv(path,async(err)=>{
            console.log(err);
        });

        res.status(200).json({success:true,msg:`File Uploaded Successfully`,path:`${path}`});
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'Server Error'}); 
    }
}

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloud(file, folderName,quality) {
    const options = { folder: folderName };
    try {
        if(quality){
            options.quality=quality;
        }
        options.resource_type="auto";
        const response = await cloudinary.uploader.upload(file.tempFilePath, options);
        return response;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

exports.imagesUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        
        const file=req.files.file;

        const supportedType=["png","jpeg","jpg"];
        const extension=file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(extension,supportedType)){
            return res.status(400).json({msg:`File type not supported`});
        }

        const response = await uploadFileToCloud(file,"fileUploadDemo",30);
       
        const fileData=await File.create({
            name,
            imageUrl:response.secure_url,
            tags,
            emails:email
        })
        res.json({success:true,msg:`File Uploaded Successfully`,imageUrl:response.secure_url});
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'Server Error'}); 
    }
}

exports.imageSizeReducer=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        
        const file=req.files.file;

        const supportedType=["png","jpeg","jpg"];
        const extension=file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(extension,supportedType)){
            return res.status(400).json({msg:`File type not supported`});
        }

        const response = await uploadFileToCloud(file,"fileUploadDemo",90);
       
        const fileData=await File.create({
            name,
            imageUrl:response.secure_url,
            tags,
            emails:email
        })
        res.json({success:true,msg:`File Uploaded Successfully`,imageUrl:response.secure_url});
    }catch(error){
        console.log(error);
        res.status(500).json({msg:'Server Error'}); 
    }
}