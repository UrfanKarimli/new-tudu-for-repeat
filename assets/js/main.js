const form = document.querySelector("#tuduAddForm")
const addBtn = document.querySelector("#todoAddButton")
const addInput = document.querySelector("#todoName")
const tuduUl = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const clearBtn = document.querySelector("#clearButton")

runEvents ()

function runEvents () {

    form.addEventListener("submit", addTodo)
}

function addTodo( e){
const inputText = addInput.value.trim()
    if(inputText=== null || inputText===""){
        alert("Please enter a text")
    }
    else {

        addTodoUi(inputText)
        addTodoStorage(inputText)

    }
e.preventDefault()
}

function addTodoUi(newtodo){

    const li = document.createElement("li")
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newtodo; 

    const a = document.createElement("a")
    a.className = "delete-item"
    a.href ="#"

    const i = document.createElement("i")
    i.className ="fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    tuduUl.appendChild(li)


    addInput.value=""
}

function addTodoStorage(newtodo) {

}