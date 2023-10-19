cargar();
// const btnrfs = document.getElementById('refresh');
// btnrfs.addEventListener('click',()=>{
//     cargar();
//   });
  function cargar(){
    let queri= 'select * from hijo'
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
            <td>${record.hijo_de}</td>
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
    let queri = `DELETE FROM hijo WHERE id = ${id}`;
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
const btnupd = document.getElementById('update');
btnupd.addEventListener('click',()=>{
    const txtid = document.getElementById('ident');
    const valid = txtid.value;
    const txtnom = document.getElementById('nombre');
    const valnom = txtnom.value;
    const txthijod = document.getElementById('idpadre');
    var valhijod = txthijod.value;
    //Siempre tiene que haber un código
    if(valhijod==""){
      valhijod='NULL';
    }
    if(valid==""){
      alert("Es necesario un id");
    }else if (valnom == ""){
      alert("Es necesario un nombre");
    }else{
      //ver si el id se ecunetra en la bd
      let queri= `select id from hijo where id = ${valid}`;
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
          //Si no está mandar una alerta
          if(data.length == 0){
            alert("Id no existe");
          }else{
            //Si no es nulo comprobar si el hijo de está en la bd
            if(valhijod !=='NULL'){
              let queri= `SELECT id FROM padre WHERE id = ${valhijod}`;
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
                  //si no se encontró dato mandar alerta, sino ya correr el update
                  if(data.length==0){
                    alert("Este padre no existe, digita uno correcto o ninguno");
                  }else{
                    let queri= `UPDATE hijo SET id = ${valid}, nom = '${valnom}', hijo_de = ${valhijod} WHERE id = ${valid}`;
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
                        //Aca hacer las cosas necesarias con data
                        txtid.value = "";
                        txtnom.value="";
                        txthijod.value="";
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
            }else{
              let queri= `UPDATE hijo SET id = ${valid}, nom = '${valnom}', hijo_de = ${valhijod} WHERE id = ${valid}`;
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
                  //Aca hacer las cosas necesarias con data
                  txtid.value = "";
                  txtnom.value="";
                  txthijod.value="";
                  cargar();
                })
                .catch(error => {
                  console.error('Error al obtener datos:', error);
                });
            }
            
          }
        })
        .catch(error => {
          console.error('Error al obtener datos:', error);
        });
    }
    
});
const btninsert = document.getElementById('insertar');
btninsert.addEventListener('click', () => {
  const txtid = document.getElementById('ident');
  const valid = txtid.value;
  const txtnom = document.getElementById('nombre');
  var valnom = txtnom.value;
  const txthijod = document.getElementById('idpadre');
  var valhijod = txthijod.value;

  // Para el caso que no tenga papá
  if (valhijod == "") {
      valhijod = 'NULL';
  }
  // Validar si el id no está repetido
  if (valid == "") {
      alert("Valor id no valido");
    } else if (valnom === "") { // Verificar si valnom está vacío
      alert("Por favor, digita un nombre");
  } else {
      let keyid = false; // Mover keyid aquí
      let queri = `SELECT id FROM hijo where id = ${valid}`;
      url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              if (data.length == 0) {
                  keyid = true; // Establecer keyid en true aquí
              } else {
                  alert("Id ya existe");
              }

              // Validar si el id del papá existe, ya el caso nulo está controlado
              if (keyid && valhijod !== 'NULL') {
                  queri = `SELECT id from padre WHERE id = ${valhijod}`;
                  url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;
                  fetch(url)
                      .then(response => {
                          if (!response.ok) {
                              throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
                          }
                          return response.json();
                      })
                      .then(data => {
                          if (data.length == 0) {
                              alert("Este padre no existe");
                          } else {
                               // Si las dos llaves son correctas, ejecutar el insert
                               let queri = `INSERT INTO hijo (id, nom, hijo_de) VALUES (${valid}, "${valnom}", ${valhijod})`;
                               url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;
 
                               fetch(url)
                                   .then(response => {
                                       if (!response.ok) {
                                           throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
                                       }
                                       return response.json();
                                   })
                                   .then(data => {
                                       // Aca hacer las cosas necesarias con data
                                       txtid.value = "";
                                       txtnom.value = "";
                                       txthijod.value="";
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
          })
          .catch(error => {
              console.error('Error al obtener datos:', error);
          });
  }
});


