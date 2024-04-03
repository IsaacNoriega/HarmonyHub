import { Router } from "express";
import userController from "../controllers/user.controller";
import hashPassword from "../utils/hash-password";
const router = Router();

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerConfig from '../../swagger.config.json';

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
