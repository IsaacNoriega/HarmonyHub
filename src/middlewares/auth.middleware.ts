import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ResponseStatus from '../utils/response-status';
import User from '../models/user.model';


export default function verifyToken(req: Request, res: Response, next: NextFunction): void {
    // Verificar si el usuario está autenticado con Google
    if (req.isAuthenticated()) {
        return next();
    } else {
        // Si no está autenticado con Google, intentar autenticación con JWT
        const token: string | undefined = req.query.t as string;

        if (token) {
            jwt.verify(token, process.env.TOKEN_KEY || '', (error: jwt.VerifyErrors | null, decoded: any) => {
                if (error) {
                    console.error('Error al decodificar el token:', error.message);
                    res.status(401).send('Token inválido');
                } else {
                    console.log('Objeto decodificado:', decoded);
                    User.findOne({
                        email: decoded.email as string
                    }).then(response => {
                        if (response) {
                            next();
                        } else {
                            console.log('Usuario no encontrado');
                            res.status(401).redirect('/login');
                        }
                    }).catch(err => {
                        console.error('Error al buscar usuario en la base de datos:', err);
                        res.status(401).redirect('/login');
                    });
                }
            });
        } else {
            console.log('Token no proporcionado en la consulta');
            res.status(401).redirect('/login');
        }
    }
}