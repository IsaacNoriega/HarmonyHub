import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import jwt from 'jsonwebtoken';
import hashPassword from "../utils/hash-password";
import Project from '../models/projects.model';
import{ URLSearchParams }  from 'url';
import response from "../utils/response";
import { json } from "stream/consumers";
import multer from "multer";
import { File } from "../types/fileImage";

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
        const data = {
            projectName : req.body.projectName,
            userId : req.body.userId,
            projectImage : `https://harmonyhub.s3.us-east-2.amazonaws.com/${req.file.originalname}`
        };

        Project.create(data).then(response =>{
            res.status(ResponseStatus.SUCCESS).send('Project created '+response); 
        }).catch(e =>{
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong');  
        })
    }

    deleteProjectByMail(req: Request, res: Response): void {
        const email = req.body.email;
        const projectName = req.body.projectName; // Corregí el acceso a req.body.email a req.body.projectName
        Project.deleteOne({
            userId: email,
            projectName: projectName // Agregué la condición del nombre del proyecto
        }).then(response => {
            if (response.deletedCount > 0) {
                res.redirect(`/home`); // Cambié la respuesta para indicar que el proyecto se eliminó correctamente
            } else {
                res.status(ResponseStatus.NOT_FOUND).send('Project Not Found'); // Agregué una respuesta si el proyecto no se encuentra
            }
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong');
        });
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

    getProjectToken(req: Request, res: Response){
        const dataToken ={
            projectName : req.body.projectName,
            userId : req.body.userId,
        }
        const token = jwt.sign(dataToken, process.env.TOKEN_KEY);
        res.cookie('tokenProject' , token , { httpOnly: true })
        res.json({ token: token });
    }

    uploadSong( req : Request , res : Response){
        const projectToken = req.cookies.tokenProject
        const decodedToken = jwt.verify(projectToken, process.env.TOKEN_KEY);
        const newSong = {
            name : req.body.name,
            url : `https://harmonymp3.s3.us-east-2.amazonaws.com/${req.file.originalname}`
        }
        console.log(req.file)

        Project.findOneAndUpdate( { projectName : decodedToken['projectName'] , userId : decodedToken['userId']}, 
            {$push : {songs : newSong}}
        ).then(response => {
            
            res.status(200).redirect(`/project?t=${projectToken}`)
        }).catch( e => {
            res.status(400).send('Something went wrong')
        })
        
    }
}

export default new ProjectController();