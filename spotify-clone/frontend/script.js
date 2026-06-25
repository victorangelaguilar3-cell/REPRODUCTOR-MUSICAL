const API_URL = 'http://localhost:3000/songs';

let songs = [];
let currentIndex = 0;
let isPlaying = false;

const songList = document.getElementById('songList');
const audioPlayer = document.getElementById('audioPlayer');
const currentSongSpan = document.getElementById('currentSong');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const searchInput = document.getElementById('searchInput');

// Cargar canciones desde el backend
async function loadSongs() {
  try {
    const res = await fetch(API_URL);
    songs = await res.json();
    renderSongs(songs);
    if (songs.length > 0) playSong(0);
  } catch (error) {
    console.error('Error al cargar canciones:', error);
  }
}

// Renderizar lista
function renderSongs(songArray) {
  songList.innerHTML = '';
  songArray.forEach((song, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${song.title}</span><span>${song.artist}</span>`;
    li.dataset.index = index;
    if (index === currentIndex) li.classList.add('active');
    li.addEventListener('click', () => playSong(index));
    songList.appendChild(li);
  });
}

// Reproducir canción
function playSong(index) {
  if (index < 0 || index >= songs.length) return;
  currentIndex = index;
  const song = songs[currentIndex];
  audioPlayer.src = song.url;
  currentSongSpan.textContent = `${song.title} - ${song.artist}`;
  audioPlayer.play();
  isPlaying = true;
  playPauseBtn.textContent = '⏸️';
  updateActiveClass();
}

// Actualizar clase activa en la lista
function updateActiveClass() {
  document.querySelectorAll('#songList li').forEach((li, i) => {
    li.classList.toggle('active', i === currentIndex);
  });
}

// Play / Pause
function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
    isPlaying = true;
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
    isPlaying = false;
  }
}

// Siguiente / Anterior
function nextSong() {
  if (songs.length === 0) return;
  const next = (currentIndex + 1) % songs.length;
  playSong(next);
}

function prevSong() {
  if (songs.length === 0) return;
  const prev = (currentIndex - 1 + songs.length) % songs.length;
  playSong(prev);
}

// Búsqueda
function searchSongs(query) {
  const filtered = songs.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.artist.toLowerCase().includes(query.toLowerCase())
  );
  renderSongs(filtered);
  if (filtered.length > 0) playSong(0);
}

// Event listeners
playPauseBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audioPlayer.addEventListener('ended', nextSong);

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (query === '') {
    renderSongs(songs);
    if (songs.length > 0) playSong(currentIndex);
  } else {
    searchSongs(query);
  }
});

// Iniciar
loadSongs();