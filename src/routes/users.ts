import { Router , Request, Response} from "express";
import userController from "../controllers/user.controller";
import hashPassword from "../utils/hash-password";
import uploadMiddleware from "../middlewares/upload-s3";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../../swagger.config.json';

const router = Router();

router.post("/upload/:id", uploadMiddleware.single('Foto'), userController.userImage);


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



router.post('/signup', userController.signUp);
router.post('/login', userController.login);



export default router;
