const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus preferencias
const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'bienestar',
  });
  // Conexión a la base de datos MySQL
conection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.message);
    } else {
      console.log('Conectado a la base de datos MySQL');
    }
  });
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`El servidor Express está escuchando en http://localhost:${port}`);
});