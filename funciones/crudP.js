
cargar();
function cargar(){
  let queri= 'select * from padre'
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
          <td><button class="eliminar" data-id="${record.id}">Eliminar</button></td>
        `;

        tableBody.appendChild(row);
      });

      // Agregar event listener para los botones de eliminar
      const botonesEliminar = document.querySelectorAll('.eliminar');
      botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
          const idAEliminar = boton.getAttribute('data-id');
          eliminarRegistro(idAEliminar);
        });
      });
    })
    .catch(error => {
      console.error('Error al obtener datos:', error);
    });
}
function eliminarRegistro(id) {
  // Realiza una solicitud para eliminar el registro con el ID proporcionado en la base de datos
  let queri = `DELETE FROM padre WHERE id = ${id}`;
  url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
      }
      // Recargar la tabla después de eliminar el registro
      cargar();
    })
    .catch(error => {
      console.error('Error al eliminar el registro:', error);
    });
}
const btninsert = document.getElementById('insertar');
btninsert.addEventListener('click', ()=>{
    const txtid = document.getElementById('ident');
    const valid = txtid.value;
    const txtnom = document.getElementById('nombre');
    const valnom = txtnom.value;
    //campos vacios
    if(valid==""){
      alert("Ingresa un id");
    }else if(valnom==""){
      alert("Ingresa nombre");
    }else{
      //ver si el id está repetido
      let queri= `SELECT id from padre WHERE id = ${valid}`;
    // Agrega el parámetro 'query' a la URL como una cadena de consulta
    url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if(data.lenght>0){
          //Si no está insertar
          let queri= `insert into padre (id, nom) values (${valid},"${valnom}")`;
          alert(queri)
          // Agrega el parámetro 'query' a la URL como una cadena de consulta
          url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;

          fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
              }
              return response.json();
            })
            .then(data => {
              txtid.value = "";
              txtnom.value="";
              cargar();
            })
            .catch(error => {
              console.error('Error al obtener datos:', error);
            });
            }else{
              alert("id ya existe");
            }
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
    }

});
const btnupd = document.getElementById('update');
btnupd.addEventListener('click',()=>{
    const txtid = document.getElementById('ident');
    const valid = txtid.value;
    const txtnom = document.getElementById('nombre');
    var valnom = txtnom.value;
    //si el id está vacio mandar alerta
    if(valid==""){
      alert("Es necesario un id");
    }else if(valnom==""){
      alert("Digita un nombre");
    }else{
      //ver si el id existe
      let queri= `SELECT id FROM padre WHERE id = ${valid}`;
      // Agrega el parámetro 'query' a la URL como una cadena de consulta
      url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data.lenght);
          if(data.lenght>0){
            //Si no esta mandar alerta
            alert("Este id no existe");
          }else{
            //Insertar
            let queri= `UPDATE padre SET id = ${valid}, nom = '${valnom}' WHERE id = ${valid}`;
            alert(queri)
            // Agrega el parámetro 'query' a la URL como una cadena de consulta
            url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;

            fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                txtid.value = "";
                txtnom.value="";
                cargar();
              })
              .catch(error => {
                console.error('Error al obtener datos:', error);
              });
          }
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
        });
    }
});