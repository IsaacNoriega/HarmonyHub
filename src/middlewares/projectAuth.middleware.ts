import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';

export default function verifyProjectToken(req: Request, res: Response, next: NextFunction): void {
    const token: string | undefined = req.query.t as string;

    jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: any) => {
        if (error) {
            console.error('Error al decodificar el token:', error.message);
            res.status(401).send('Token inválido');
        } else {
            console.log('Objeto decodificado:', decoded);
            User.findOne({
                email: decoded.userId as string
            }).then(response => {
                if (response) {
                    next();
                } else {
                    console.log('Project not found');
                    res.status(401).redirect('/home');
                }
            }).catch(err => {
                console.error('Error al buscar project en la base de datos:', err);
                res.status(401).redirect('/home');
            });
        }

    })
}