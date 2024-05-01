// Establecer una conexión Socket.IO
const socket = io();

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const cookies = document.cookie.split(';'); // Dividir todas las cookies en un array
    for (let cookie of cookies) { // Iterar sobre cada cookie
        const [cookieName, cookieValue] = cookie.trim().split('='); // Dividir cada cookie en su nombre y valor
        if (cookieName === name) { // Verificar si el nombre de la cookie coincide con el nombre especificado
            return decodeURIComponent(cookieValue); // Devolver el valor de la cookie (decodificado)
        }
    }
    return null; // Devolver null si no se encuentra la cookie
}

// Obtener el nombre de usuario de las cookies o solicitarlo al usuario si no está definido
const userName = getCookie('username') || 'guest';

// Establecer el nombre de usuario en el elemento 'user'
document.getElementById('user').innerText = userName;

// Emitir un evento 'newUser' con el nombre de usuario al servidor
socket.emit('newUser', {
    user: userName
});

// Manejar el evento 'newUser' del servidor
socket.on('newUser', (data) => {
    // Llamar a la función newUserMessage con el nombre de usuario recibido del servidor
    newUserMessage(data.user);
});

// Manejar el evento 'newMessage' del servidor
socket.on('newMessage', (data) => {
    // Llamar a la función newMessage con los datos recibidos del servidor
    newMessage(data);
});

// Manejar el evento 'chat message' del servidor
socket.on('chat message', (data) => {
    // Llamar a la función newMessage con los datos recibidos del servidor
    newMessage(data);
});

// Manejar el evento 'userLeft' del servidor
socket.on('userLeft', (data) => {
    // Llamar a la función userLeftMessage con el nombre de usuario recibido del servidor
    userLeftMessage(data.user);
});

// Función para mostrar un mensaje cuando un nuevo usuario se une al chat
function newUserMessage(name) {
    const p = document.createElement('p');
    p.className = 'new-user';
    p.innerText = `${name} joined the chat`;
    messages.append(p);
}

// Función para mostrar un mensaje cuando un usuario deja el chat
function userLeftMessage(name) {
    const p = document.createElement('p');
    p.className = 'user-left';
    p.innerText = `${name} left the chat`;
    messages.append(p);
}

// Función para mostrar un nuevo mensaje en el chat
function newMessage(data, mine) {
    // Crear un nuevo elemento 'p' para el mensaje
    const p = document.createElement('p');
    let name = data.user;
    if (mine) {
        p.className = 'message mine';
        name = 'You';
    } else {
        p.className = 'message';
    }

    // Establecer el contenido del elemento 'p' con el nombre de usuario y el mensaje recibidos
    p.innerHTML = `<span>${name}</span><p>${data.message}</p>`;
    p.id = new Date().getTime();
    // Agregar el elemento 'p' al contenedor de mensajes
    messages.append(p);
    // Desplazar hacia abajo para mostrar el nuevo mensaje
    document.getElementById(p.id).scrollIntoView();
}

// Obtener el contenedor de mensajes
const messages = document.getElementById('messages');
// Obtener el campo de entrada de mensajes
const input = document.getElementsByTagName('input')[0];

// Mostrar un mensaje para el usuario actual al unirse al chat
newUserMessage('You');

// Manejar el envío del formulario
document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input.value;
    if (!message) return;
    // Mostrar el mensaje enviado por el usuario actual
    newMessage({ user: userName, message }, true);
    // Emitir un evento 'newMessage' al servidor con el nombre de usuario y el mensaje
    socket.emit('newMessage', {
        user: userName,
        message
    });
    // Limpiar el campo de entrada
    input.value = '';
});

// Mostrar un mensaje de confirmación al intentar salir de la página
window.onbeforeunload = (event) => {
    return 'Are you sure you want to leave?';
};
