import { Router, Request, Response } from "express";
import authMiddlweare from '../middlewares/auth.middleware';
import User from "../models/user.model";
import jwt  from "jsonwebtoken";
import response from "../utils/response";
const router = Router();

router.get('', authMiddlweare, (req, res) => {
    const token: string | undefined = req.query.t as string;
    jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: any) =>{
        if (error) {
            console.error('Error al decodificar el token:', error.message);
            res.status(401).send('Token inválido');
        } else {
            User.findOne({
                email : decoded.email
            }).then(response =>{
                if(response.image){
                    res.render('projects', { layout: 'sidebarmenu', profileImg: response.image });
                }
                else{
                    res.render('projects', { layout: 'sidebarmenu', profileImg: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' });
                }
            })
        }
    })
});

router.get('', authMiddlweare, (req, res) => {
    res.send('usuario autenticado por google');
});

router.get('/project', authMiddlweare, (req, res) => {
    res.render('singleProject', { layout: 'sidebarmenu' });
});

export default router;