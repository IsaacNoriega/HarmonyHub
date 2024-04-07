import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ResponseStatus from '../utils/response-status';
import User from '../models/user.model';

export default function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token: string | undefined = req.query.token as string;
    console.log(token);

    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
            if (error) {
                console.error('Error al decodificar el token:', error.message);
                res.send('Usuario no autenticado');
            } else if (decoded) {
                console.log('Objeto decodificado:', decoded);
                User.findOne({
                    email: decoded.email as string
                }).then(response => {
                    if (response) {
                        next();
                    } else {
                        console.log('Usuario no encontrado');
                        res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
                    }
                }).catch(err => {
                    console.error('Error al buscar usuario en la base de datos:', err);
                    res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
                });
            } else {
                console.error('Token decodificado indefinido');
                res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
            }
        });
    } else {
        res.sendStatus(ResponseStatus.UNAUTHTENTICATED);
    }
}
