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



