// src/app.js
const express = require('express');
const cors = require('cors');
const usuarioRoutes = require('../routes/usuarioRoutes');
const productoRoutes = require('../routes/productoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ mensaje: 'El servidor está funcionando 🚀' });
});

// Rutas del CRUD
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/productos', productoRoutes);

module.exports = app;