const btnrfs = document.getElementById('refresh');
btnrfs.addEventListener('click',()=>{
    cargar();
  });
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
    const valhijod = txthijod.value;
    let queri= `UPDATE hijo SET id = ${valid}, nom = '${valnom}', hijo_de ${valhijod} WHERE id = ${valid}`;
    
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
    cargar();
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
});
const btninsert = document.getElementById('insertar');
btninsert.addEventListener('click', ()=>{
    var keyid = true;
    var keypapa=false;
    const txtid = document.getElementById('ident');
    const valid = txtid.value;
    const txtnom = document.getElementById('nombre');
    const valnom = txtnom.value;
    const txthijod = document.getElementById('idpadre');
    var valhijod = txthijod.value;
    //Para el caso que no tenga papá
    if (valhijod == ""){
        valhijod = 'NULL';
        keypapa=true;
    }
    //validar si el id no está repetido
    if (valid == ""){
        alert("Valor id no valido");
        keyid=false;
    }else{
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
            if(data.length== 0){
                keyid = true;
            }else{
                alert("Id ya existe")
            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
    });
    }
    //validar si el id del papá existe, ya el caso nulos está controlado
    if(keyid == true && keypapa== false){
        queri= `SELECT hijo_de from hijo WHERE hijo_de = ${valhijod}`;
        url = `http://localhost:3001/api/data?query=${encodeURIComponent(queri)}`;
        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Error en la respuesta de la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if(data.length== 0){
                keypapa = false;
                alert("Este padre no existe")
            }else{
                keypapa=true;
            }
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
    }
    //Si las dos llaves son correctas ejecutar ya el insert 
    if(keyid==true && keypapa==true){
        queri= `insert into hijo (id, nom, hijo_de) values (${valid},"${valnom}",${valhijod})`;
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
        console.log("hola desde lo q sea");
        txtid.value = "";
        txtnom.value="";
        cargar();
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });
    } 
});

