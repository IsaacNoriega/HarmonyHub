import socketIo from 'socket.io';
import response from '../utils/response';

export default function setupSocket(server) {
    const io = new socketIo.Server(server);

    // Configura Socket.IO para la ruta '/support'
    io.of('/home').on('connection', (socket) => {
        console.log('Un nuevo usuario se ha conectado');
    
        
        socket.on('disconnect', () => {
            socket.broadcast.emit('userLeft', { ...socket.data });
        });
    });
}
