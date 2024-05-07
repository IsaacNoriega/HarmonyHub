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

