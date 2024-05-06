import { Router, Request, Response } from "express";
import authMiddlweare from '../middlewares/auth.middleware';
import User from "../models/user.model";
import jwt  from "jsonwebtoken";
import Project from '../models/projects.model'
import uploadMp3 from "../middlewares/upload-s3-mp3";
import projectController from "../controllers/project.controller";

const router = Router();

router.get('', (req, res) => {
    //obtener informacion del proyecto
    const token: string | undefined = req.query.t as string;

    jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: any) => {
        if(error){
            res.status(401).send('Token inválido');
        }
        Project.findOne({
            projectName : decoded.projectName,
            userId : decoded.userId
        }).then(response =>{
            console.log(response);
            const songNames = response.songs.map(song => song.name); // Extraer solo los nombres de las canciones
            const songUrls = response.songs.map(song => song.url); // Extraer solo las URLs de las canciones
            const combinedSongs = songNames.map((name, index) => ({ name, url: songUrls[index] }));
            res.render('singleProject', { layout: 'sidebarmenu', projectName : decoded.projectName, userId: decoded.userId, songs : combinedSongs});
        })
    })
    
});

router.post('/uploadSong', uploadMp3.single('Song'), projectController.uploadSong)

export default router;