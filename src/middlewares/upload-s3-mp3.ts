import multer , { FileFilterCallback } from "multer";
import multerS3 from 'multer-s3';
import {  Request , Response } from 'express';
import { S3Client } from "@aws-sdk/client-s3";
import { MP3File } from "../types/fileMp3";

const s3Mp3 = new S3Client({
    region : process.env.REGION,
    credentials : {
        accessKeyId : process.env.S3_ACCESS_KEY,
        secretAccessKey :process.env.S3_SECRET_KEY
    }
});

const s3StorageMp3 = multerS3({
    s3 : s3Mp3 ,
    bucket : process.env.S3_NAME_MP3,
    metadata : ( req , file , cb ) => {
        cb(null , {...file});
    },
    acl : 'public-read',
    key : ( req , file , cb ) => {
        cb(null , file.originalname);
    }
});

const mp3FileFilter = ( req: Request , file: MP3File , cb:FileFilterCallback) => {
    const isValid = file.mimetype.startsWith('audio/mpeg')
    if( isValid){
        cb(null ,isValid);
    }else{
        cb(new Error('Invalid file type. Only audios are allowed.'))
    }
}

const uploadMp3 = multer({
    storage : s3StorageMp3,
    fileFilter : mp3FileFilter
});

export default uploadMp3;