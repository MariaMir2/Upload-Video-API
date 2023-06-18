//Obtengo todos los elementos del HTML

const videoRep = document.getElementById('videoRep');
const videoContainer = document.getElementById('videoContainer');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const barraV = document.getElementById('barraV');
const masV = document.getElementById('masV');
const menosV = document.getElementById('menosV');
const cargando = document.getElementById('mensaje');

//Habilito el funcionamiento de los diferentes botones y la barra

play.addEventListener('click', () => {
    videoRep.play();
});

pause.addEventListener('click', () => {
    videoRep.pause();
});

barraV.addEventListener('input', () => {
    videoRep.volume = barraV.value;
});

masV.addEventListener('click', () => {
    if (videoRep.volume < 1) {
        videoRep.volume += 0.1;
    }
});

menosV.addEventListener('click', () => {
    if (videoRep.volume > 0) {
        videoRep.volume -= 0.1;
    }
});

//Configuramos que aparezca y desaparezca el mensaje de cargando video
//Cuando empieza la subida y la carga del vídeo, y cuando ya se ha cargado el video por completo

videoRep.addEventListener('loadedmetadata', () => {
    cargando.classList.add('hidden');
});

videoRep.addEventListener('loadstart', () => {
    cargando.classList.remove('hidden');
});

//Restablecemos los valores predeterminados: ponemos el video en pausa, eliminamos el video cargado,
//Ponemos el volumen al máximo, y ocultamos el mensaje de 'cargando video'.

function reiniciarRep() {
    videoRep.pause();
    videoRep.src = '';
    barraV.value = 1;
    cargando.classList.add('hidden');
    videoContainer.classList.add('hidden');
}

//Seleccionamos un archivo y lo cargamos

function handleFileSelect(event) {
    reiniciarRep(); //Restablecemos el reproductor
    const file = event.target.files[0]; //Seleccionamos el archivo
    if (file) { //Comprobamos que se haya seleccionado un archivo
        if (file.type.startsWith('video/')) { //Comprobamos que sea un archivo válido

            //Leemos el archivo y establecemos los eventos
            const archivo = new FileReader();

            archivo.onloadstart = () => {
                cargando.textContent = 'Cargando...';
                cargando.classList.remove('hidden');
            };

            archivo.onload = () => {
                videoRep.src = archivo.result;
                videoContainer.classList.remove('hidden');
                cargando.classList.add('hidden');
            };
    
            archivo.onerror = () => {
                alert('Error al cargar el video.');
                cargando.textContent = 'Error';
                cargando.classList.add('hidden');
            };
    
            archivo.readAsDataURL(file);
        } else {
            alert('El archivo seleccionado no es un video válido. No se puede reproducir.');
            event.target.value = null;
        }
    }
}
  
document.getElementById('videoFile').addEventListener('change', handleFileSelect);

  