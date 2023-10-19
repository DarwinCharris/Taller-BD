cargar();
function cargar(){
    let queri= 'SELECT padre.nom AS NombreDelPadre, COUNT(hijo.id) AS CantidadDeHijos FROM padre LEFT JOIN hijo ON padre.id = hijo.hijo_de GROUP BY padre.id, padre.nom'
    url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Limpiar la tabla antes de llenarla
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';
  
        // Llenar la tabla con los datos
        data.forEach(record => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${record.NombreDelPadre}</td>
            <td>${record.CantidadDeHijos}</td>
          `;
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }
