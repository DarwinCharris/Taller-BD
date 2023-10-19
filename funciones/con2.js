cargar();
function cargar(){
    let queri= 'SELECT * FROM padre WHERE NOT EXISTS (SELECT 1 FROM hijo WHERE hijo.hijo_de = padre.id)'
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
            <td>${record.id}</td>
            <td>${record.nom}</td>
          `;
  
          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }