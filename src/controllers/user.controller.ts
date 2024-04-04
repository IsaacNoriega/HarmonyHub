import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import jwt from 'jsonwebtoken';
import hashPassword from "../utils/hash-password";
import User from '../models/user.model';

//Requerimentos para Multer
import { File } from "./../types/file";
import multer, {FileFilterCallback} from "multer";
import s3Storage from "multer-s3";

const storage = multer.diskStorage({
    filename : ( req , file , cb ) => {
        cb(null , file.originalname);
    },
    destination : ( req, file , cb ) => {
        cb(null, process.env.UPLOAD_FOLDER);
    }
});

const fileFilter = ( req : Request , file : File , cb : FileFilterCallback)=>{
    const isValid = file.mimetype.startsWith('image/');
    cb(null , isValid);
};

const upload = multer({
    storage,
    fileFilter
})



class UsersController {

    //Post para hacer login
    login(req: Request, res: Response): void {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).then(response => {
            if(response){
                const data = {
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    password: response.password
                }
                res.status(ResponseStatus.SUCCESS).send('Login succeeded');


            } else{
                res.status(ResponseStatus.UNAUTHTENTICATED).send('user not authenticated');
            }
            
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).send('something went wrong...');
        });
    }


    //Post para crear usuario
    signUp(req: Request, res: Response): void {
        //Datos del usuario
        const data = {
            name : req.body.name,
            email : req.body.email,
            password : hashPassword(req.body.password)
        };
        //Crear el nuevo usuario en la DB
        User.create(data).then( response => {
            res.status(ResponseStatus.SUCCESS).send('Sign Up success '); 
        }).catch( e => {
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong');        
        });
    }

    userImage(req: Request , res: Response) : void {
        const userId = req.params.id;
        const fileName = req.file.originalname;
        const imagePath = `uploads/users/${userId}/images/${fileName}`;

        User.findByIdAndUpdate(userId , {$set : { image : imagePath }}).then(response =>{
            res.send('Uploaded').status(ResponseStatus.SUCCESS);
        }).catch( e => {
            res.send('Something went wrong').status(ResponseStatus.BAD_REQUEST);
        })
    }


}

export default new UsersController();

