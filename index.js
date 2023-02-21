// Obtener el formulario y la tabla
const form = document.querySelector('#form-notas');
const tabla = document.querySelector('#tabla-notas tbody');

// Agregar un listener al formulario para escuchar el evento submit
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtener los valores de los campos
  const nombre = form.nombre.value;
  const nota1 = parseFloat(form.nota1.value);
  const nota2 = parseFloat(form.nota2.value);

  // Calcular el promedio
  const promedio = (nota1 + nota2) / 2;

  // Determinar si el estudiante aprobó o no
  const estado = promedio >= 7 ? 'Aprobado' : 'Reprobado';

  // Crear una nueva fila en la tabla con los valores ingresados
  const fila = tabla.insertRow();
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${nota1}</td>
    <td>${nota2}</td>
    <td>${promedio}</td>
    <td>${estado}</td>
  `;

  // Limpiar los campos del formulario
  form.reset();

  // Almacenar los valores ingresados en el almacenamiento local
  const datos = JSON.parse(localStorage.getItem('datos')) || [];
  datos.push({ nombre, nota1, nota2 });
  localStorage.setItem('datos', JSON.stringify(datos));
});

// Obtener los datos almacenados y mostrarlos en la tabla
const datos = JSON.parse(localStorage.getItem('datos')) || [];
datos.forEach((dato) => {
  const fila = tabla.insertRow();
  fila.innerHTML = `
    <td>${dato.nombre}</td>
    <td>${dato.nota1}</td>
    <td>${dato.nota2}</td>
    <td>${(dato.nota1 + dato.nota2) / 2}</td>
    <td>${(dato.nota1 + dato.nota2) / 2 >= 7 ? 'Aprobado' : 'Reprobado'}</td>
  `;
});

// Agregar un listener al botón "Vaciar tabla" para limpiar la tabla y el almacenamiento local
const botonVaciarTabla = document.querySelector('#boton-vaciar-tabla');
botonVaciarTabla.addEventListener('click', () => {
  tabla.innerHTML = '';
  localStorage.removeItem('datos');
});
