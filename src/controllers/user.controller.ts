import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import jwt from 'jsonwebtoken';
import hashPassword from "../utils/hash-password";
import User from '../models/user.model';
import{ URLSearchParams }  from 'url';

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



const upload = multer({
    storage,
})



class UsersController {

    //Post para hacer login
    login(req: Request, res: Response): void {
        User.findOne({
            email: req.body.email,
            password: hashPassword(req.body.password)
        }).then(response => {
            if(response){
                const dataToken = {
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    password: response.password
                }
                console.log(dataToken);
                console.log(process.env.TOKEN_KEY)
                const token = jwt.sign(dataToken, process.env.TOKEN_KEY);
                res.cookie('email', dataToken.email, { httpOnly: true });
                res.redirect('/home?t='+token);

            } else{
                res.status(ResponseStatus.UNAUTHTENTICATED).send('user not authenticated');
                console.log('no hay');
            }
            
        }).catch(e => {
            res.status(ResponseStatus.BAD_REQUEST).send('something went wrong...');
        });
    }


    //Post para crear usuario
    signUp(req: Request, res: Response): void {
        //Datos del usuario
        console.log(req.body.password);
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
        const email = req.cookies.email;
        const fileName = req.file.originalname;
        const imagePath = `uploads/users/${email}/images/${fileName}`;

        User.findOneAndUpdate({email} , {$set : { image : imagePath }}).then(response =>{
            res.render('home')
        }).catch( e => {
            res.send('Something went wrong').status(ResponseStatus.BAD_REQUEST);
        })
    }


}


export default new UsersController();

