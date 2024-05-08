import { Router, Request, Response } from "express";
import authMiddlweare from '../middlewares/auth.middleware';
import User from "../models/user.model";
import jwt  from "jsonwebtoken";
import response from "../utils/response";
import projectController from '../controllers/project.controller';
import uploadMp3 from "../middlewares/upload-s3-mp3";
import upload from "../middlewares/upload-s3-Images";
import userController from "../controllers/user.controller";
import axios from "axios";
const router = Router();

router.post('', projectController.getProjectsByUserMail);


/**
 * @swagger
 * /home/deleteProject:
 *   post:
 *     summary: Eliminar proyecto por correo electrónico
 *     description: Elimina un proyecto asociado al correo electrónico del usuario.
 *     tags: [Project]
 *     parameters:
 *       - in: formData
 *         name: correoElectronico
 *         description: Correo electrónico del usuario
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente.
 *       400:
 *         description: Error al intentar eliminar el proyecto.
 */
router.post('/deleteProject', projectController.deleteProjectByMail);

/**
 * @swagger
 * /home/updateProject:
 *   post:
 *     summary: Actualizar proyecto por correo electrónico
 *     description: Actualiza un proyecto asociado al correo electrónico del usuario.
 *     tags: [Project]
 *     parameters:
 *       - in: formData
 *         name: correoElectronico
 *         description: Correo electrónico del usuario
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente.
 *       400:
 *         description: Error al intentar actualizar el proyecto.
 */
router.post('/updateProject', projectController.updateProjectByMail);

/**
 * @swagger
 * /home/createProject:
 *   post:
 *     summary: Crear proyecto
 *     description: Crea un nuevo proyecto.
 *     tags: [Project]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: Foto
 *         description: Foto del proyecto
 *         required: true
 *         type: file
 *       - in: formData
 *         name: correoElectronico
 *         description: Correo electrónico del usuario
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Proyecto creado exitosamente.
 *       400:
 *         description: Error al intentar crear el proyecto.
 */
router.post('/createProject', upload.single('Foto'), projectController.createProject);


router.get('', authMiddlweare, (req, res) => {
    const token: string | undefined = req.query.t as string;
    jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: any) =>{
        if (error) {
            console.error('Error al decodificar el token:', error.message);
            res.status(401).send('Token inválido');
        } else {
            User.findOne({
                email : decoded.email
            }).then(response1 =>{
                axios.post(`${process.env.AXIOS_URL}`+`${process.env.PORT}`+'/home',{
                    email: response1.email
                }).then( projects =>{
                    if(response1.image){
                        res.render('projects', { layout: 'sidebarmenu', profileImg: response1.image, userName: response1.name, projects : projects.data, userId: response1.email, token: token});
                    }else{
                        res.render('projects', { layout: 'sidebarmenu', profileImg: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', userName: response1.name, projects : projects.data, userId: response1.email, token: token });
                    }
                })
            })
        }
    })
});


router.post('/getProjectToken', projectController.getProjectToken);



export default router;