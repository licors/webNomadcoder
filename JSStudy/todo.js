const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; //list
let idNum = 1;

function deleteToDo(event) {
    //console.dir(event.target);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // filter 는 각 요소마다 해당 함수 실행하고 true 리턴한 것만 모아서 새로운 array 만듬
    toDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
}

function saveToDos() {
    // localstorage in must string type
    // stringify()  object -> string
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = idNum++;
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;
    li.appendChild(span); // span 을 li 안에 넣기
    li.appendChild(delBtn);
    li.id = newId.toString();
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        // string -> object
        const parsedToDos = JSON.parse(loadedToDos);
        // 각각의 parsedToDos 에 함수가 동작됨
        parsedToDos.forEach(function (toDo) {
                paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();