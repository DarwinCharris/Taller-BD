const mysql = require('mysql2');
const express = require('express');

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'bienestar',
  });
  conection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos: ' + err.message);
    } else {
      console.log('Conectado a la base de datos MySQL');
    }
  });
  const app = express();
  const port = 3000; // Puedes cambiar el puerto según tus preferencias
  app.use(express.static('public'));

app.listen(port, () => {
  console.log(`El servidor Express está escuchando en http://localhost:${port}`);
});
  conection.end();