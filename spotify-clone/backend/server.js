const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta para obtener todas las canciones
app.get('/songs', (req, res) => {
  const dataPath = path.join(__dirname, '../data/songs.json');
  const data = fs.readFileSync(dataPath, 'utf-8');
  const songs = JSON.parse(data);
  res.json(songs);
});

// (Opcional) Ruta para agregar una canción (POST)
app.post('/songs', (req, res) => {
  const dataPath = path.join(__dirname, '../data/songs.json');
  const data = fs.readFileSync(dataPath, 'utf-8');
  const songs = JSON.parse(data);
  const newSong = req.body;
  newSong.id = songs.length + 1;
  songs.push(newSong);
  fs.writeFileSync(dataPath, JSON.stringify(songs, null, 2));
  res.status(201).json(newSong);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});