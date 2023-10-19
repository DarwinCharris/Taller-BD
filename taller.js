//importe de exprress, mysql y cors
const express = require('express');
//hacer la app con express
const app = express();
const cors = require('cors'); // Importa el paquete cors
const mysql = require('mysql2');
const path = require('path');
//Conectar la base de datos 
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'bienestar',
//   });
const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones simultáneas
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'bienestar',
});
  app.use(cors()); // Habilita CORS para todas las rutas


//usar la appi 
// app.get('/api/data', (req, res) => {
//     //toma el query para 
//   let query = req.query.query; 
//   console.log(query)
//   let data = [];
//     //Conecta la base de datos y realiza el query
//   connection.connect((err) => {
//     if (err) {
//       console.error('Error al conectar a la base de datos: ' + err.message);
//     } else {
//         executeStatement(query)
//     }
//   });
app.get('/api/data', (req, res) => {
  let query = req.query.query;
  console.log(query)
  let data = [];
  pool.execute(query, (error, results) => {
    if (error) {
      console.error('Error al realizar la consulta:', error);
      res.status(500).send('Error en la consulta');
      return;
    }
    data.push(results)
    console.log(results)
    res.json(results);
  });
});


  //Funcion que ejecuta un query y lo guarda en la variable data
  // function executeStatement(query) {
  //   connection.query(query, (error, results) => {
  //       if (error) {
  //         console.error('Error al realizar la consulta:', error);
  //         return;
  //       }else{
  //           //Guarda la data de modo que se podrá usar con la api
  //           data.push(results)
  //           console.log(results)
  //           res.json(results)
  //       }
  //     });
  // }

app.use('/funciones', express.static(path.join(__dirname, 'funciones')));
const PORT = 3001;
//Usa la información del html
app.use(express.static('public'));
//Abrir la página
app.listen(PORT, () => {
  console.log(`El servidor Express está escuchando en http://localhost:${PORT}`);
});