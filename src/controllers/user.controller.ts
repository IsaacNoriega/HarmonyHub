import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import jwt from 'jsonwebtoken';
import hashPassword from "../utils/hash-password";
import User from '../models/user.model';

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
}

export default new UsersController();

