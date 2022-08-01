// variables
let activeFilterTab = document.querySelector("a.active");

// Select DOM
const todoInput = document.querySelector(".todo-input"); // 輸入框
const add = document.querySelector(".btn__submit");
const sectionTodo = document.querySelector("section");
const filter = document.querySelectorAll(".filter_btn"); // 篩選器 tabs

// Event Listeners
add.addEventListener("click", onAddTodo);
filter.forEach((btn) => {
  btn.addEventListener("click", onFilter);
});

// Functions
function onAddTodo(e) {
  e.preventDefault();
  if (todoInput.value == "") {
    window.alert("請重新輸入");
    return;
  }
  // create list
  let newTodo = document.createElement("div");
  newTodo.className = "d-flex TodoList isntdone";
  newTodo.style.animation = "scaleUp 0.3s forwards";
  let newTodo_text = document.createElement("input");
  newTodo_text.setAttribute("type", "text");
  newTodo_text.setAttribute("value", todoInput.value);
  newTodo_text.addEventListener("change", onEditTodo);
  newTodo.appendChild(newTodo_text);

  //Create Completed Button
  let complete_icon = document.createElement("i");
  complete_icon.className = "fa-solid fa-check";
  complete_icon.addEventListener("click", onToggleCompelete);
  newTodo.prepend(complete_icon);

  //Create trash button
  let deleteTodobtn = document.createElement("button");
  deleteTodobtn.className = "btn delete";
  deleteTodobtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  deleteTodobtn.addEventListener("click", onDeleteTodo);
  newTodo.appendChild(deleteTodobtn);

  sectionTodo.appendChild(newTodo)
  // clear input
  todoInput.value = "";
}

function onEditTodo(e) {
  console.log('handle change', e.target.value)
}

function onDeleteTodo(e) {
  let deleteItem = e.target.parentElement;
  deleteItem.remove();
}

function onToggleCompelete(e) {
  const doneItem = e.target.parentElement;
  doneItem.classList.toggle("done");
  filterTodo();
}

function onFilter(e) {
  // console.log(e)
  const prevActiveTab = document.querySelector("a.active");
  prevActiveTab.classList.remove("active");
  activeFilterTab = e.target;
  activeFilterTab.classList.add("active")
  filterTodo();
}

function filterTodo() {
  const todos = sectionTodo.childNodes;
  if(!todos) {
    return;
  }
  todos.forEach((el)=>{
    switch(activeFilterTab.text) {
      case 'All':
        el.style.display = 'flex';
        break
      case 'ToDo':
        el.style.display = el.classList.contains("done") ? 'none' : 'flex';
        break
        case 'Completed':
        el.style.display = !el.classList.contains("done") ? 'none' : 'flex';
        break
      default:
        break
    }
  })
}

function refresh() {
  // window.location.reload();
}

