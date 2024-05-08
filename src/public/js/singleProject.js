function changeBackground(track) {
    var tracks = document.querySelectorAll('.track');
    tracks.forEach(function (item) {
        if (item === track) {
            item.classList.add('clicked');
        } else {
            item.classList.remove('clicked');
        }
    });
}

document.getElementById("newTrack").addEventListener("click", function () {
    var form = document.querySelector(".dropzone-box");
    var overlay = document.getElementById("overlay");
    form.style.display = "block"; // Mostrar el formulario
    overlay.classList.add("visible"); 
    let a = document.getElementsByClassName('visible');
    a[0].addEventListener('click',function(){
        form.style.display = "none";
        overlay.classList.remove('visible');
    })
});

document.getElementById("addTrack").addEventListener("click", function () {
    var form = document.querySelector(".dropzone-box");
    var overlay = document.getElementById("overlay");
    form.style.display = "block"; // Mostrar el formulario
    overlay.classList.add("visible"); 
    let a = document.getElementsByClassName('visible');
    a[0].addEventListener('click',function(){
        form.style.display = "none";
        overlay.classList.remove('visible');
    })
});

//dropzone

const dropzoneBox = document.getElementsByClassName("dropzone-box")[0];

const inputFiles = document.querySelectorAll(
    ".dropzone-area input[type='file']"
);

const inputElement = inputFiles[0];

const dropZoneElement = inputElement.closest(".dropzone-area");

inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
        updateDropzoneFileList(dropZoneElement, inputElement.files[0]);
    }
});

dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("dropzone--over");
});

["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("dropzone--over");
    });
});

dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;

        updateDropzoneFileList(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("dropzone--over");
});

const updateDropzoneFileList = (dropzoneElement, file) => {
    let dropzoneFileMessage = dropzoneElement.querySelector(".message");

    dropzoneFileMessage.innerHTML = `
        ${file.name}, ${file.size} bytes
    `;
};

dropzoneBox.addEventListener("reset", (e) => {
    let dropzoneFileMessage = dropZoneElement.querySelector(".message");

    dropzoneFileMessage.innerHTML = `No Files Selected`;
});


<<<<<<< HEAD
document.addEventListener('click', function (event) {
  const modalProject = document.getElementById('modalNewProject');
  if (modalVisible && !modalProject.contains(event.target)) {
    modalVisible = false;
    modalProject.classList.add('hidden'); // Agregar la clase hidden para ocultar el modal con animación
=======
// Obtener todas las pistas de audio
const audioPlayers = document.querySelectorAll('.audioPlayer');

// Para cada pista de audio, obtenemos la duración y la mostramos en el elemento span correspondiente
audioPlayers.forEach(audio => {
    audio.addEventListener('loadedmetadata', () => {
        const duration = Math.floor(audio.duration); // Duración en segundos
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        const trackContainer = audio.closest('.track');
        const durationSpan = trackContainer.querySelector('.duration');
        durationSpan.textContent = formattedDuration;
    });
});

// Obtener todas las pistas de audio
const tracks = document.querySelectorAll('.track');

// Agregar un evento de clic a cada pista
tracks.forEach(track => {
    track.addEventListener('click', () => {
        // Obtener el elemento de audio dentro de la pista
        const audio = track.querySelector('audio');
        
        // Verificar si el audio está pausado o en reproducción y actuar en consecuencia
        if (audio.paused) {
            audio.play(); // Si está pausado, reproduzca el audio
        } else {
            audio.pause(); // Si está reproduciendo, pausa el audio
        }
    });
});
>>>>>>> 7f72d2d2798f41e75e9ed0ad3726b5391b3fb293

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

      const modalProject = document.getElementById('modalNewProject');
      modalProject.style.display = 'none';


    },
    error: function (xhr, status, error) {
      // Manejar errores de la solicitud
      console.error('Error en la solicitud:', status, error);
    }
  });

});
