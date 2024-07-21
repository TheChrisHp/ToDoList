let todoArray = [];
let contador = 0;

//traigo elementos del DOM a mi JS
let btnAgregar = document.getElementById("btnAgregar");
let container = document.querySelector(".cont-tareas");

//tarea INPUT
let tarea = document.getElementById("tarea");

let addToDo = () => {
  let agregoAlArray = {
    id: contador++,
    texto: tarea.value,
    estado: false,
  };
  if (agregoAlArray.texto === "" || !isNaN(agregoAlArray.texto)) {
    let msgError = document.createElement("div");
    msgError.innerHTML = `<p class="errorMSG">Error, no puedes ingresar textos vacios.</p>`;
    container.appendChild(msgError);
    setTimeout(() => {
      container.removeChild(msgError);
    }, 2000);
    return;
  }
  todoArray.push(agregoAlArray);
  console.log(todoArray);
  tarea.value = "";
  renderizarTareas();
};

btnAgregar.addEventListener("click", addToDo);
tarea.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addToDo();
  }
});

//FUNCIONES EVENTOS
const tareaCompleta = (tarea) => {
  let encontrado = todoArray.find((alterno) => alterno.id === tarea.id);
  encontrado.estado = !encontrado.estado;
  renderizarTareas();
};

const borrarTarea = (tarea) => {
  todoArray = todoArray.filter((borrar) => borrar.id !== tarea.id);
  renderizarTareas();
};

const renderizarTareas = () => {
  container.innerHTML = "";
  todoArray.forEach((tarea) => {
    let tareasDom = document.createElement("ul");
    if (tarea.estado) {
      tareasDom.classList.add("tarea-completada");
    }
    tareasDom.innerHTML = `
    <span class="texto-tarea">${tarea.texto}</span>
    <button class="btnBorrar">Borrar</button>
    <button class="btnCompletado ${
      tarea.estado === false ? "no-completado" : "completado"
    }">${tarea.estado === false ? "No Completada" : "Completada"}</button>`;

    let botonBorrar = tareasDom.querySelector(".btnBorrar");
    let completado = tareasDom.querySelector(".btnCompletado");

    completado.addEventListener("click", () => {
      tareaCompleta(tarea);
    });

    botonBorrar.addEventListener("click", () => {
      borrarTarea(tarea);
    });
    container.appendChild(tareasDom);
  });
};
