let queri = "SELECT id FROM padre";
console.log("lo que sea jsjsj");
//Hacer los arreglos correspondientes para arreglar el query 

// Agrega el parámetro 'query' a la URL como una cadena de consulta
url = `http://localhost:3004/api/data?query=${encodeURIComponent(queri)}`;

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    //Aca hacer las cosas necesarias con data
    console.log("hola desde lo q sea");
    console.log(data);
    console.log(data[0].id);
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
