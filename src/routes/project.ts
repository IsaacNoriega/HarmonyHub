import { Router, Request, Response } from "express";
import authMiddlweare from '../middlewares/auth.middleware';
import User from "../models/user.model";
import jwt  from "jsonwebtoken";
import response from "../utils/response";
import projectController from '../controllers/project.controller';
import uploadMp3 from "../middlewares/upload-s3-mp3";
import userController from "../controllers/user.controller";
import axios from "axios";
const router = Router();

router.get('', (req, res) => {
    //obtener informacion del proyecto
    const token: string | undefined = req.query.t as string;

    jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: any) => {
        res.render('singleProject', { layout: 'sidebarmenu', projectName : decoded.projectName, userId: decoded.userId});
    })
    
});


export default router;