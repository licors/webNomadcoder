// querySelector 는 찾은 것 첫 번째 것만 가져온다.
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser", //user local storage
    SHOWING_CN = "showing"; // showing class name

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    // 이벤트 기본 동작은 도큐먼트까지 쭉 올라가고 리프레시이지만 이 동작을 안하게 하기 위해
    event.preventDefault()
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();