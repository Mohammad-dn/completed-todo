const mainList = document.getElementById("form");
const todoTitle = document.getElementById("todoTitle");
const todoDesc = document.getElementById("desc");
const submitButton = document.getElementById("submitbtn");
const mainListItem = document.getElementById("mainListItem");
const closeAlert = document.getElementById("close-alert");
const toastifyElement = document.getElementById("alert");
const toastify = (msg, options) => {
  toastifyElement.style.right = "0";
  switch (options.type) {
    case "warn":
      toastifyElement.style.backgroundColor = "tomato";

      break;
    case "error":
      toastifyElement.style.backgroundColor = "orange";

    default:
      toastifyElement.style.backgroundColor = "gainsbro";

      break;
  }
  toastifyElement.children[0].innerHTML = msg;
  toastifyElement.children[1].addEventListener("click", () => {
    toastifyElement.style.right = "-100%";
  });
  setTimeout(function () {
    toastifyElement.style.right = "-100%";
  }, options.time || 3000);
};

function getLocatedTodos() {
  const savedLCTodos = localStorage.getItem("todoItem");
  return JSON.parse(savedLCTodos)?.sort((a, b) => a.id - b.id) || [];
}

let saveTodos = [...getLocatedTodos()];
const creatNewTodo = (title, desc, id, checked) => {
  const listItem = document.createElement("li");
  listItem.className = "list";
  listItem.id = id;
  const titleListItem = document.createElement("h3");
  const todoTitleInput = document.createElement("input");
  titleListItem.appendChild(todoTitleInput);
  todoTitleInput.defaultValue = title;
  todoTitleInput.classList = "title-input";
  todoTitleInput.disabled = "true";
  titleListItem.style.backgroundColor = "orange";
  if (checked) {
    titleListItem.style.backgroundColor = "green";
  }
  const descListItem = document.createElement("p");
  descListItem.style.backgroundColor = "";
  descListItem.innerHTML = desc;
  const todoController = document.createElement("div");
  const delButton = document.createElement("button");
  delButton.className = "btn-2";
  delButton.innerHTML = "Del";
  delButton.id = id;
  const editButton = document.createElement("button");
  editButton.className = "btn-2";
  editButton.innerHTML = "Edite";
  editButton.id = id;

  const updateButton = document.createElement("button");
  updateButton.className = "btn-2";
  updateButton.innerHTML = "check";
  updateButton.id = id;

  // append my Element in parent tag

  todoController.appendChild(delButton);
  todoController.appendChild(editButton);
  todoController.appendChild(updateButton);
  listItem.appendChild(titleListItem);
  listItem.appendChild(descListItem);
  listItem.appendChild(todoController);
  mainListItem.appendChild(listItem);
};

function renderTodo() {
  getLocatedTodos().forEach((todo) => {
    creatNewTodo(todo.title, todo.desc, todo.id, todo.checked);
  });
}
renderTodo();
const handeCreatTodo = (event) => {
  event.preventDefault();
  if (!todoTitle.value)
    return toastify("please type somthing ...", {
      time: 2000,
      type: "error",
    });
  const newTodo = {
    title: todoTitle.value,
    desc: todoDesc.value,
    id: Date.now(),
    checked: false,
  };
  saveTodos.push(newTodo);
  localStorage.setItem("todoItem", JSON.stringify(saveTodos));
  creatNewTodo(newTodo.title, newTodo.desc, newTodo.id);
};

mainListItem.addEventListener("click", (e) => {
  const id = e.target.id;
  if (e.target.innerText === "Del") {
    const filteredTodo = getLocatedTodos().filter(
      (item) => item.id !== Number(id)
    );
    console.log(filteredTodo);
    saveTodos = filteredTodo;
    localStorage.setItem("todoItem", JSON.stringify(filteredTodo));
    mainListItem.innerHTML = "";
    renderTodo();

    // location.reload();
  } else if (e.target.innerText === "check") {
    const filteredTodo = getLocatedTodos().filter(
      (item) => item.id === Number(id)
    );
    const updateFilteredTodo = {
      ...filteredTodo[0],
      checked: true,
    };
    const filteredTodosUpdate = getLocatedTodos().filter(
      (item) => item.id !== Number(id)
    );
    const updateSavedTodos = [...filteredTodosUpdate, updateFilteredTodo];
    localStorage.setItem("todoItem", JSON.stringify(updateSavedTodos));
    mainListItem.innerHTML = "";
    renderTodo();
  } else if (e.target.innerText === "Edite") {
    const todoEl = e.target.parentElement.parentElement;
    todoEl.children[0].children[0].disabled = false;
    todoEl.children[0].children[0].style.backgroundColor = "blue";
    todoEl.children[0].children[0].select();
    e.target.innerText = "save";
    e.target.addEventListener("click", () => {
      const filteredTodo = getLocatedTodos().filter(
        (item) => item.id === Number(todoEl.id)
      );
      const updateFilteredTodo = {
        ...filteredTodo[0],
        title: todoEl.children[0].children[0].value,
      };

      const filteredTodosUpdate = getLocatedTodos().filter(
        (item) => item.id !== Number(id)
      );
      // console.log(filteredTodosUpdate);
      const updateSavedTodos = [...filteredTodosUpdate, updateFilteredTodo];
      // console.log(updateSavedTodos);
      localStorage.setItem("todoItem", JSON.stringify(updateSavedTodos));
      mainListItem.innerHTML = "";
      renderTodo();
    });
  }
});

submitButton.addEventListener("click", handeCreatTodo);

// const arr1=['b','c','g','a','d']
// console.log(arr1);
// console.log(arr1.sort());
// const arrN=[4,3,5,1,5,22,7,9,3,2]
// console.log(arrN);
// console.log(arrN.sort((a,b)=>a-b));
