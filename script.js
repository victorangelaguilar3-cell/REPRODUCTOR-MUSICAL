const playerContainer = document.querySelector('.player-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const playIcon = document.getElementById('play-icon');
const volumeSlider = document.getElementById('volume');

// Listado de canciones de ejemplo (puedes añadir las tuyas locales o URLs)
const songs = [
    { title: 'SoundHelix 1', artist: 'Artista A', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400' },
    { title: 'SoundHelix 2', artist: 'Artista B', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400' }
];

let songIndex = 0;

// Cargar los detalles de la canción
function loadSong(song) {
    document.getElementById('title').innerText = song.title;
    document.getElementById('artist').innerText = song.artist;
    audio.src = song.src;
    document.getElementById('cover').src = song.cover;
}

// Inicializar cargando la primera canción
loadSong(songs[songIndex]);

// Funciones de reproducción
function playSong() {
    playerContainer.classList.add('play');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    audio.play();
}

function pauseSong() {
    playerContainer.classList.remove('play');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    audio.pause();
}

// Cambiar de canción
function prevSong() {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

// Actualizar barra de progreso
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

// Saltar a un punto específico de la canción al hacer click en la barra
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Control de Volumen
function changeVolume() {
    audio.volume = volumeSlider.value;
}

// Listeners (Escuchadores de eventos)
playBtn.addEventListener('click', () => {
    const isPlaying = playerContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', changeVolume);

// Auto-avanzar cuando termine la canción
audio.addEventListener('ended', nextSong);