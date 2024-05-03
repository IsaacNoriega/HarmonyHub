import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import jwt from 'jsonwebtoken';
import hashPassword from "../utils/hash-password";
import Project from '../models/projects.model';
import{ URLSearchParams }  from 'url';
import response from "../utils/response";

class ProjectController{

    createProject(req: Request, res: Response): void{
        const data = {
            projectName : req.body.projectName,
            userId : req.body.email,
        };
        Project.create(data).then(response =>{
            res.status(ResponseStatus.SUCCESS).send('Project Created'); 
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
        Project.findOne({
            userId : email
        }).then(response =>{
            res.status(ResponseStatus.SUCCESS).send('Projects found: '+ response); 
            return response
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
}

export default new ProjectController();