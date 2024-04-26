import socketIo from 'socket.io';
import response from '../utils/response';

export default function setupSocket(server) {
    const io = new socketIo.Server(server);

    // Configura Socket.IO para la ruta '/support'
    io.of('/support').on('connection', (socket) => {
        console.log('Un nuevo usuario se ha conectado');
        
        socket.on('newUser', (data) => {
            socket.data.user = data.user;
            socket.broadcast.emit('newUser', data);
            socket.emit('chat message', { user: 'Soporte', message: `Hola ${data.user}, bienvenido al chat de Soporte de HarmonyHub. Para iniciar la conversacion escribe "Hola" y para terminar escriba "Adios" `});
        });

        socket.on('newMessage', (data) => {

            let responseMessage = '';
            // Verifica el mensaje recibido y asigna la respuesta correspondiente
            switch (data.message.toLowerCase()) {
                case 'hola':
                    responseMessage = response.HELLO
                    break;
                case 'adios':
                    responseMessage = response.BYE
                    break;
                case '1':
                    responseMessage = response.OPT1
                    break;
                case '2':
                    responseMessage = response.OPT2
                    break;
                case '3':
                    responseMessage = response.OPT3
                    break;
                default:
                    responseMessage = response.ERROR
                    break;
            }
            // Emitir el mensaje de respuesta solo al cliente que envió el mensaje
            socket.emit('chat message', { user: 'Server', message: responseMessage });
        });
        
        socket.on('disconnect', () => {
            socket.broadcast.emit('userLeft', { ...socket.data });
        });
    });
}
