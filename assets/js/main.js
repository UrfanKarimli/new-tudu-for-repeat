const form = document.querySelector("#tuduAddForm")
const addBtn = document.querySelector("#todoAddButton")
const addInput = document.querySelector("#todoName")
const tuduUl = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const clearBtn = document.querySelector("#clearButton")
const searchInput = document.querySelector("#todoSearch")

let todos = [];

runEvents ()

function runEvents () {

    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", pageLoaded)
    secondCardBody.addEventListener("click",deleteTuduFromUi)
    clearBtn.addEventListener("click", allTodosRemoved)
    searchInput.addEventListener("keyup", findTheTodo)

}

function findTheTodo(e){
    let findValue = e.target.value.toLowerCase().trim();
    const todolist = document.querySelectorAll(".list-group-item")
    if(todolist.length>0){
        todolist.forEach((todo) => {
            if(todo.textContent.toLowerCase().trim().includes(findValue)){
                todo.setAttribute("style", "display: block");
            }
            else {
                todo.setAttribute("style", "display: none !important");
            }
        })
    }
    else {
        showAlert("warning","todo list is empty")
    }
}

function allTodosRemoved(){

    const todolist = document.querySelectorAll(".list-group-item")
    if(todolist.length > 0){
        alert("are you sure")
        alert("Are you realy sure you want to delete")
        alert("Okey, you can delete it :)")
        todolist.forEach((todo)=> {
            todo.remove();
        })
        todos=[]
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("succeeded", "All todos deleted successfully")
    }else{
        showAlert("warning", "Todo list is empty")
    }

}

function deleteTuduFromUi(e){
    if (e.target.className === "fa fa-remove"){
        const tudu = e.target.parentElement.parentElement
        tudu.remove()
        showAlert("primary", "Todo deleted!")
        removetodoFromStorage(tudu.textContent)
    }
}

function removetodoFromStorage(removetodo) {
    checkTodosFromStorage()
    todos.map((todo, index) =>{
        if (removetodo===todo){
            todos.splice(index, 1)

        }
    })
    localStorage.setItem('todos', JSON.stringify(todos)) 




}

function pageLoaded (){
    checkTodosFromStorage()
    todos.map((todo,index) =>{
        addTodoUi(todo, index)
    })
}

function addTodo( e){
const inputText = addInput.value.trim()
    if(inputText=== null || inputText===""){

        showAlert("warning" , "Please enter a text")
    }
    else {

        addTodoUi(inputText)
        addTodoStorage(inputText)
        showAlert("success" , "added successfully")
    }
e.preventDefault()
}

function addTodoUi(newtodo){


    const li = document.createElement("li")
    li.className = "list-group-item d-flex  text-capitalize"
    li.textContent = newtodo;  

    const a = document.createElement("a")
    a.className = "delete-item ms-auto"
    a.href ="#"

    const i = document.createElement("i")
    i.className ="fa fa-remove"

    a.appendChild(i)
    li.appendChild(a)
    tuduUl.appendChild(li)

    addInput.value=""
}

function addTodoStorage(newtodo) {
    checkTodosFromStorage()
todos.push(newtodo)
localStorage.setItem("todos",JSON.stringify(todos))
}

function checkTodosFromStorage () {
    if(localStorage.getItem("todos")===null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
}

function showAlert (type, message) {
    const div = document.createElement("div")
    div.className = `position-absolute top-1 start-2  alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);
    setTimeout(() =>{
            div.remove()
    },2000)
}