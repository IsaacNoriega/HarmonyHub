import socketIo from 'socket.io';
import response from '../utils/response';

export default function setupSocket(server) {
    const io = new socketIo.Server(server);

    io.on('connection', (socket) => {
        console.log('Un nuevo usuario se ha conectado');
        
        socket.on('newUser', (data) => {
            // Asignar al usuario una sala de chat única basada en su identificador (p. ej., nombre de usuario)
            socket.join(data.user);

            // Emitir un mensaje de bienvenida al usuario
            io.to(data.user).emit('chat message', { user: 'Soporte', message: `Hola ${data.user}, bienvenido al chat de Soporte de HarmonyHub. Para iniciar la conversación, escribe "Hola" y para terminar, escribe "Adiós"` });
        });

        socket.on('newMessage', (data) => {
            let responseMessage = '';

            switch (data.message.toLowerCase()) {
                case 'hola':
                    responseMessage = response.HELLO;
                    break;
                case 'adios':
                    responseMessage = response.BYE;
                    break;
                case '1':
                    responseMessage = response.OPT1;
                    break;
                case '2':
                    responseMessage = response.OPT2;
                    break;
                case '3':
                    responseMessage = response.OPT3;
                    break;
                default:
                    responseMessage = response.ERROR;
                    break;
            }

            // Enviar el mensaje de respuesta solo a la sala de chat del usuario que envió el mensaje
            io.to(data.user).emit('chat message', { user: 'Server', message: responseMessage });
        });
        
        socket.on('disconnect', () => {
            // Aquí puedes implementar la lógica para manejar la desconexión de un usuario
            console.log('Usuario desconectado');
        });
    });
}
