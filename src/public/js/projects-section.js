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

