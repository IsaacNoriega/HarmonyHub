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


//crear nuevo proyecto
document.getElementById('projectForm').addEventListener('submit', function (event) {

  event.preventDefault();

  const projectName = document.getElementById('inputNewProject').value;
  // Esto imprimirá el valor del userId que viene del contexto de Handlebars

  const data = {
    projectName: projectName,
    userId: userIdFront
  };

  // Enviar solicitud POST utilizando AJAX
  $.ajax({
    url: 'http://localhost:3000/home/createProject',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: (response) => {
      const cardsContainer = document.getElementById('cardsContainer');
      const child = cardsContainer.firstElementChild;
      const newDiv = document.createElement('div');
      newDiv.classList.add('card');
      newDiv.innerHTML = `
          <div class="card-image">
            <img src="https://i.pinimg.com/564x/47/5b/72/475b72acb3f65dd57e938e4eab8ac895.jpg" alt="">
          </div>
          <div class="card-description">
            <p class="text-title">${data.projectName}</p>
            <p class="text-body">By ${data.userId}</p>
      `;

      if (child.classList.contains('noProjects')) {
        cardsContainer.innerText = '';
        cardsContainer.appendChild(newDiv);
      } else {
        cardsContainer.appendChild(newDiv);
      }


    },
    error: function (xhr, status, error) {
      // Manejar errores de la solicitud
      console.error('Error en la solicitud:', status, error);
    }
  });

});



