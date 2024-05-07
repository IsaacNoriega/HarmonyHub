const newProjectButton = document.getElementsByClassName('addProject');
let modalVisible = false;

for (const modalButton of newProjectButton) {
  modalButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Detener la propagación del evento hacia el modal

    const modalProject = document.getElementById('modalNewProject');
    modalVisible = !modalVisible; // Alternar el estado de visibilidad del modal
    modalProject.style.display = modalVisible ? 'block' : 'none'; // Mostrar u ocultar el modal según su estado de visibilidad

    if (modalVisible) {
      // Agregar un event listener para ocultar el modal al hacer clic en el fondo
      modalProject.addEventListener('click', function (event) {
        if (event.target === this) {
          modalVisible = false;
          this.classList.add('hidden'); // Agregar la clase hidden para ocultar el modal con animación

          // Esperar a que termine la animación de salida antes de ocultar realmente el modal
          setTimeout(() => {
            this.style.display = 'none';
          }, 300); // Ajusta el tiempo para que coincida con la duración de la animación en CSS
        }
      });

      // Aplicar la animación de entrada al modal
      modalProject.classList.remove('hidden');
    }
  });
}

// Detectar clics fuera del modal para ocultarlo si está visible
document.addEventListener('click', function (event) {
  const modalProject = document.getElementById('modalNewProject');
  if (modalVisible && !modalProject.contains(event.target)) {
    modalVisible = false;
    modalProject.classList.add('hidden'); // Agregar la clase hidden para ocultar el modal con animación

    // Esperar a que termine la animación de salida antes de ocultar realmente el modal
    setTimeout(() => {
      modalProject.style.display = 'none';
    }, 300); // Ajusta el tiempo para que coincida con la duración de la animación en CSS
  }
});


document.getElementById('projectForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Obtener los datos del formulario
  const projectName = document.getElementById('inputNewProject').value;
  const fileInput = document.querySelector('input[type="file"]');
  const file = fileInput.files[0]; // Obtener el primer archivo seleccionado
  const fileUrl = `https://harmonyhub.s3.us-east-2.amazonaws.com/${file.name}`;
  const userId = userIdFront; // Supongo que userIdFront ya está definido en tu código

  // Crear un objeto FormData para enviar los datos con el archivo
  const formData = new FormData();
  formData.append('Foto', file); // Añadir el archivo al FormData
  formData.append('projectName', projectName); // Añadir el nombre del proyecto
  formData.append('userId', userId); // Añadir el userId

  // Enviar solicitud POST utilizando AJAX
  $.ajax({
      url: 'http://localhost:3000/home/createProject',
      type: 'POST',
      data: formData, // Enviar FormData en lugar de JSON
      contentType: false, // Importante: no configurar contentType cuando se usa FormData
      processData: false, // Importante: no procesar datos cuando se usa FormData
      success: function (response) {
          // Manejar el éxito de la solicitud
          const cardsContainer = document.getElementById('cardsContainer');
          const child = cardsContainer.firstElementChild;
          const newDiv = document.createElement('div');
          newDiv.classList.add('card');
          newDiv.innerHTML = `
              <div class="card-image">
                  <img src="${fileUrl}" alt="">
              </div>
              <div class="card-description">
                  <p class="text-title">${projectName}</p>
                  <p class="text-body">By ${userId}</p>
              </div>
          `;

          if (child.classList.contains('noProjects')) {
              cardsContainer.innerText = '';
              cardsContainer.appendChild(newDiv);
          } else {
              cardsContainer.appendChild(newDiv);
          }

          const modalProject = document.getElementById('modalNewProject');
          modalProject.style.display = 'none';
      },
      error: function (xhr, status, error) {
          // Manejar errores de la solicitud
          console.error('Error en la solicitud:', status, error);
      }
  });
});


function redirectProject(projectName, userId) {
  $.ajax({
    url: 'http://localhost:3000/home/getProjectToken',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      projectName: projectName,
      userId: userId,
    }),
    success: function (response) {
      // Aquí response contendrá el token generado en el backend
      console.log('Token generado:', response.token);
      window.location.href = '/project?t='+response.token;
    },
    error: function (xhr, status, error) {
      console.error('Error al obtener el token:', error);
    }
  });
}



