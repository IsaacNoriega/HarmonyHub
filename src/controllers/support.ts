import socketIo from 'socket.io';

export default function setupSocket(server) {
    const io = new socketIo.Server(server);

    // Configura Socket.IO para la ruta '/support'
    io.of('/support').on('connection', (socket) => {
        console.log('Un nuevo usuario se ha conectado');
        
        socket.on('newUser', (data) => {
            socket.data.user = data.user;
            socket.broadcast.emit('newUser', data);
            socket.emit('chat message', { user: 'Soporte', message: `Hola ${data.user}, bienvenido al chat de Soporte de HarmonyHub. ¿En qué puedo ayudarte? <br> 1) Cuenta <br> 2) Carga de archivos <br> 3) Otros`});
        });

        socket.on('newMessage', (data) => {

            let responseMessage = '';
            // Verifica el mensaje recibido y asigna la respuesta correspondiente
            switch (data.message.toLowerCase()) {
                case 'hola':
                    responseMessage = 'Hola';
                    break;
                case 'adios':
                    responseMessage = 'Hasta luego';
                    break;
                default:
                    responseMessage = 'Por favor, elige una opción válida';
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
