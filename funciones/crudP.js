const btninsert = document.getElementById('insertar');
btninsert.addEventListener('click', ()=>{
    const txtid = document.getElementById('ident');
    const valid = txtid.value;
    const txtnom = document.getElementById('nombre');
    const valnom = txtnom.value;
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
    //Aca hacer las cosas necesarias con data
    console.log("hola desde lo q sea");
    // console.log(data);
    // console.log(data[0].id);
    location.reload();
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
});

const btnupd = document.getElementById('update');
btnupd.addEventListener('click',()=>{
    const txtid = document.getElementById('ident');
    const valid = txtid.value;
    const txtnom = document.getElementById('nombre');
    const valnom = txtnom.value;
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
    //Aca hacer las cosas necesarias con data
    console.log("hola desde lo q sea");
    // console.log(data);
    // console.log(data[0].id);
    //Refrescar la página
    location.reload();
  })
  .catch(error => {
    console.error('Error al obtener datos:', error);
  });
});