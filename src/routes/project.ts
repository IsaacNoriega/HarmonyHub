import { Router, Request, Response } from "express";
import authMiddlweare from '../middlewares/auth.middleware';
import User from "../models/user.model";
import jwt  from "jsonwebtoken";
import Project from '../models/projects.model'
import uploadMp3 from "../middlewares/upload-s3-mp3";
import projectController from "../controllers/project.controller";

const router = Router();







/**
 * @swagger
 * /project:
 *   get:
 *     summary: Obtener información del proyecto
 *     description: Devuelve información detallada sobre un proyecto.
 *     tags : [Project]
 *     parameters:
 *       - in: query
 *         name: t
 *         description: Token de autenticación
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información del proyecto obtenida exitosamente.
 *       401:
 *         description: Token inválido.
 *       500:
 *         description: Error al obtener información del proyecto.
 */
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
            console.log(combinedSongs)
            res.render('singleProject', { layout: 'sidebarmenu', projectImage : response.projectImage , projectName : decoded.projectName, userId: decoded.userId, songs : combinedSongs});
        })
    })
    
});




/**
 * @swagger
 * /user/uploadSong:
 *   post:
 *     summary: Subir una canción al proyecto
 *     description: Sube un archivo de canción al proyecto.
 *     tags : [Project]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: Song
 *         description: Archivo de la canción a subir
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Archivo de la canción subido exitosamente.
 *       400:
 *         description: Error al intentar subir el archivo de la canción.
 */
router.post('/uploadSong', uploadMp3.single('Song'), projectController.uploadSong)

export default router;