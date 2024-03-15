import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import hashPassword from "../utils/hash-password";
import User from '../models/user.model';

class UsersController {

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
            res.status(ResponseStatus.SUCCES).send('Sign Up success '); 
        }).catch( e => {
            res.status(ResponseStatus.BAD_REQUEST).send('Something went wrong');        
        });
    }
}

export default new UsersController();

