import multer , {FileFilterCallback} from "multer";
import { Request, Response } from "express";
import multerS3 from 'multer-s3';
import { S3Client } from "@aws-sdk/client-s3";
import { File } from "./../types/file";


//Conexion al bucket 
const s3 = new S3Client({
    region : process.env.REGION,
    credentials : {
        accessKeyId : process.env.S3_ACCESS_KEY,
        secretAccessKey : process.env.S3_SECRET_KEY
    }
});

const s3Storage = multerS3({
    s3 : s3,
    bucket : process.env.S3_NAME,
    metadata : (req, file, cb) => {
        cb(null,{...file});
    },
    acl : 'public-read' , 
    key : (req ,file , cb)=>{
        cb(null,file.originalname);
    }
});

const fileFilter = ( req : Request , file : File , cb : FileFilterCallback)=>{
    const isValid = file.mimetype.startsWith('image/');
    if(isValid){
        cb(null , isValid);
    }else{
        cb(new Error('Invalid file type. Only images are allowed.'));

    }
};

const upload = multer({
    storage : s3Storage,
    fileFilter : fileFilter
});

export default upload;
