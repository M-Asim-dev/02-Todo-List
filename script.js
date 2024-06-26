let mainParent = document.querySelector(".todo-lists-elem");
let inputValue = document.getElementById("inputValue");
let btn = document.querySelector(".btn");

btn.addEventListener("click" , (e)=> {
    addTodoList(e)
})

let getTodoFromLocal = () => {
    return JSON.parse(localStorage.getItem("todo"))
}

let localTodoList = getTodoFromLocal() || [];

let addTodoList = (e) => {
    e.preventDefault();
    let input = inputValue.value.trim();
    inputValue.value = ""
    
    if(input === ""){
        alert("Please Enter Valid Todo List")
        return false;
    }
    if(localTodoList.includes(input)){
        alert("You Already Enter Same Todo")
        return false;
    }

    localTodoList.push(input);

    localStorage.setItem("todo" , JSON.stringify(localTodoList))

    addTodoDynamic(input)
}

let addTodoDynamic = (input) => {
    let div = document.createElement("div");
    div.classList.add("main_todo_div");
    div.innerHTML = `<li>${input}</li> <button onclick="removeTodo(this)">Delete</button>`
    mainParent.append(div);
}

let removeTodo = (i) => {
    let elem = i.closest("div");
    let liValue = i.previousElementSibling;
    
    localTodoList = localTodoList.filter((todo)=> {
        return todo !== liValue.textContent
    })
    localStorage.setItem("todo" , JSON.stringify(localTodoList) )

    elem.remove();
}

let showTodoList = () => {
    localTodoList.forEach((todo)=>{
        addTodoDynamic(todo)
    })
}
showTodoList();

mainParent.addEventListener("click" , (e)=> {
    e.preventDefault();
})