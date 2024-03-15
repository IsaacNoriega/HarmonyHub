import { Request, Response } from "express";
import ResponseStatus from '../utils/response-status';
import hashPassword from "../utils/hash-password";
import User, { IUser } from '../models/user.model';

class UsersController {
    registerUser(req: Request, res: Response): void {
        try {
            // Obtener los datos del formulario
            const { email, name, password } = req.body;

            // Hashear la contraseña antes de guardarla en la base de datos
            const hashedPassword: string = hashPassword(password);

            // Crear una nueva instancia del modelo de usuario con los datos del formulario
            const newUser: IUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
            });

            // Guardar el nuevo usuario en la base de datos
            newUser.save((error: any, savedUser: IUser | null) => {
                if (error) {
                    console.error('Error al guardar usuario:', error);
                    res.status(ResponseStatus.BAD_REQUEST).json({ error: 'Error al crear usuario' });
                } else if (savedUser) {
                    // Usuario guardado correctamente
                    const data = {
                        name: savedUser.name,
                        email: savedUser.email,
                    };
                    res.status(ResponseStatus.SUCCESS).redirect('/'); // Redirigir al usuario después de registrar
                } else {
                    // Manejar el caso en el que savedUser es null
                    console.error('El usuario guardado es nulo');
                    res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send('Error al crear usuario');
                }
            });

        } catch (error) {
            // Manejar errores
            console.error('Error al registrar usuario:', error);
            res.status(500).send('Error al registrar usuario');
        }
    }
}

export default UsersController;

