import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import jwt from 'jsonwebtoken';
import hashPassword from "../utils/hash-password";
import Project from '../models/projects.model';
import{ URLSearchParams }  from 'url';
import response from "../utils/response";
import { json } from "stream/consumers";
import multer from "multer";
import { MP3File } from "../types/fileMp3";

// Middleware para archivos MP3
const storageForMP3 = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        // Puedes especificar una carpeta diferente si lo deseas
        cb(null, process.env.UPLOAD_FOLDER);
    }
});

const uploadMp3 = multer({
    storage : storageForMP3,
})

class ProjectController{

    createProject(req: Request, res: Response): void{
        const mp3 = req.file.originalname;
        const song = `https://harmonymp3.s3.us-east-2.amazonaws.com/${mp3}`
        const token = req.cookies.token
        const data = {
            projectName : req.body.projectName || 'Default',
            userId : req.cookies.email,
            songs : [song]
        };
        Project.create(data).then(response =>{
            res.status(ResponseStatus.SUCCESS).redirect(`/home?t=${token}`); 
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong');  
        })
    }

    deleteProjectByMail(req: Request, res: Response): void{
        const email = req.body.email;
        Project.deleteOne({
            userId : email
        }).then(response =>{
            res.status(ResponseStatus.SUCCESS).send('Project Deleted: '+ response); 
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong'); 
        })
    }

    getProjectsByUserMail(req: Request, res: Response){
        const email = req.body.email;
        Project.find({
            userId : email
        }).then(response =>{
            res.status(ResponseStatus.SUCCESS).json(response); 
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong'); 
        })
    }

    updateProjectByMail(req: Request, res: Response){
        const email = req.body.email;
        const data ={
            projectName : req.body.projectName,
            projectImage : req.body.projectImage,
            collaboratos: req.body.collaborators
        }
        Project.updateOne({
            userId : email
        },data).then(response=>{
            res.status(ResponseStatus.SUCCESS).send('Project updated: '+ response); 
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong'); 
        })
    }

    fromTokenToJson(req: Request, res: Response){
        const token: string | undefined = req.query.t as string;
        jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: any) =>{
            if (error) {
                console.error('Error al decodificar el token:', error.message);
                res.status(401).send('Token inválido');
            } else {
                res.status(200).json(decoded);
            }
        })
    }
}

export default new ProjectController();