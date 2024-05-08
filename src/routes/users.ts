import { Router , Request, Response} from "express";
import userController from "../controllers/user.controller";
import hashPassword from "../utils/hash-password";
import uploadImage from "../middlewares/upload-s3-Images";
import uploadMp3 from "../middlewares/upload-s3-mp3";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../../swagger.config.json';
import authMiddlweare from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /upload/{id}:
 *   post:
 *     summary: Upload image to User Profile
 *     description: Allows a user to upload an image for their profile.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: formData
 *         name: Foto
 *         type: file
 *         required: true
 *         description: Image to upload for the profile
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Error uploading the image
 */
router.post("/uploadImage", uploadImage.single('Foto'), userController.userImage);



/**
 * @swagger
 * /uploadName:
 *   post:
 *     summary: Cambiar nombre de usuario
 *     description: Cambia el nombre de usuario del usuario.
 *     tags : [User]
 *     parameters:
 *       - in: formData
 *         name: nuevoNombre
 *         description: Nuevo nombre de usuario
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Nombre de usuario cambiado exitosamente.
 *       400:
 *         description: Error al intentar cambiar el nombre de usuario.
 */
router.post("/uploadName", userController.changeUsername);



/**
 * @swagger
 * /uploadPassword:
 *   post:
 *     summary: Cambiar contraseña de usuario
 *     description: Cambia la contraseña del usuario.
 *     tags : [User]
 *     parameters:
 *       - in: formData
 *         name: nuevaContraseña
 *         description: Nueva contraseña del usuario
 *         required: true
 *         type: string
 *       - in: formData
 *         name: contraseñaActual
 *         description: Contraseña actual del usuario
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente.
 *       400:
 *         description: Error al intentar cambiar la contraseña.
 */
router.post("/uploadPassword", userController.changePassword);



router.get("/signup", (req, res) => {
    res.render('register');
});

/**
 * @swagger
 * /:
 *  get:
 *      summary: api login
 *      tags: [Autentication]
 *      description: login endpoint
 */
router.get("/login", (req, res) => {
    res.render('login');
});

router.get("", (req, res) => {
    res.render('home');
});

router.get("/profile",userController.getUserByEmail)

router.post('/signup', userController.signUp);
router.post('/login',userController.login);




export default router;
