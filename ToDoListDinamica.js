
let tasks = [];
let done = [];

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const ul = document.getElementById("taskList");


// function aggiungiElemento() {
//     const inputElemento = document.getElementById("nuovo-elemento");
//     const nuovoElemento = inputElemento.value;
//     if (nuovoElemento) {
//         listaElementi.push(nuovoElemento);
//         alert('Elemento aggiunto: ' + nuovoElemento + '. La lista corrente è: ' + listaElementi.join(', '));
//         inputElemento.value = '';
//     }
// }

function renderTasks() {
    ul.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = tasks[i];
        if (done[i]) span.classList.add("done");

        const btnToggle = document.createElement("button");
        btnToggle.textContent = done[i] ? "Non finito" : "Finito";
        btnToggle.dataset.action = "toggle";
        btnToggle.dataset.index = i; 

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Elimina";
        btnDelete.dataset.action = "delete";
        btnDelete.dataset.index = i;

        li.appendChild(span);
        li.appendChild(btnToggle);
        li.appendChild(btnDelete);

        ul.appendChild(li);
  }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if (text.length < 3) {
        alert("La task deve avere almeno 3 caratteri!");
        return;
    }

    tasks.push(text);
    done.push(false);

    input.value = "";
    renderTasks(); 
});


ul.addEventListener("click" , (e) => {
    const action = e.target.dataset.action;
    const index = e.target.dataset.index;

    if(!action) return;

    if (action == "toggle"){
        done[index] = !done[index]; //diventa del valore opposto
    }

    if(action == "delete"){
        tasks.splice(index, 1);
        done.splice(index, 1);
    }

    renderTasks();

})


